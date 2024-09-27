# Specify the required Terraform version and providers
terraform {
  required_version = ">= 0.14.9"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  # Configure the backend for storing Terraform state
  backend "s3" {
    bucket         = "apartment-finder-terraform-state"
    key            = "terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "apartment-finder-terraform-locks"
  }
}

# Configure the AWS provider
provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

# Data source for available AWS availability zones
data "aws_availability_zones" "available" {
  state = "available"
}

# Create the main VPC
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "apartment-finder-vpc"
  }
}

# Create public subnets
resource "aws_subnet" "public" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "apartment-finder-public-subnet-${count.index + 1}"
  }
}

# Create private subnets
resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 2)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "apartment-finder-private-subnet-${count.index + 1}"
  }
}

# Create Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "apartment-finder-igw"
  }
}

# Create public route table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "apartment-finder-public-rt"
  }
}

# Associate public subnets with the public route table
resource "aws_route_table_association" "public" {
  count          = 2
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Create security group for web servers
resource "aws_security_group" "web" {
  name        = "apartment-finder-web-sg"
  description = "Security group for web servers"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "apartment-finder-web-sg"
  }
}

# Create security group for database
resource "aws_security_group" "db" {
  name        = "apartment-finder-db-sg"
  description = "Security group for database"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "PostgreSQL from web servers"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }

  tags = {
    Name = "apartment-finder-db-sg"
  }
}

# Create RDS instance
resource "aws_db_instance" "main" {
  identifier             = "apartment-finder-db"
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "13.7"
  instance_class         = "db.t3.micro"
  name                   = "apartmentfinder"
  username               = var.db_username
  password               = var.db_password
  parameter_group_name   = "default.postgres13"
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  skip_final_snapshot    = true
}

# Create DB subnet group
resource "aws_db_subnet_group" "main" {
  name       = "apartment-finder-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "apartment-finder-db-subnet-group"
  }
}

# Create ElastiCache cluster
resource "aws_elasticache_cluster" "main" {
  cluster_id           = "apartment-finder-cache"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.main.name
  security_group_ids   = [aws_security_group.web.id]
}

# Create ElastiCache subnet group
resource "aws_elasticache_subnet_group" "main" {
  name       = "apartment-finder-cache-subnet-group"
  subnet_ids = aws_subnet.private[*].id
}

# Create ECS cluster
resource "aws_ecs_cluster" "main" {
  name = "apartment-finder-cluster"

  tags = {
    Name = "apartment-finder-ecs-cluster"
  }
}

# Create ECR repositories
resource "aws_ecr_repository" "backend" {
  name                 = "apartment-finder-backend"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "frontend" {
  name                 = "apartment-finder-frontend"
  image_tag_mutability = "MUTABLE"
}

# TODO: Add ECS task definitions and services

# TODO: Add Application Load Balancer

# TODO: Add CloudWatch alarms and logs

# TODO: Add IAM roles and policies for ECS tasks and services

# Human tasks:
# - Review and adjust the VPC CIDR block and subnet configurations based on expected traffic and scalability requirements
# - Set up appropriate IAM roles and policies for ECS tasks and services
# - Configure CloudWatch alarms and logs for monitoring the infrastructure
# - Set up an Application Load Balancer for the ECS services
# - Implement a CI/CD pipeline for automated deployments to ECS