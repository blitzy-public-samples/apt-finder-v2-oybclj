# Provider configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# RDS PostgreSQL instance
resource "aws_db_instance" "this" {
  identifier        = "${var.project_name}-${var.environment}-db"
  engine            = "postgres"
  engine_version    = "13.7"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  max_allocated_storage = 100
  
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password
  port     = 5432

  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.rds_subnet_group.name
  parameter_group_name   = aws_db_parameter_group.rds_param_group.name

  backup_retention_period = 7
  multi_az               = var.environment == "production" ? true : false
  skip_final_snapshot    = var.environment == "production" ? false : true
  final_snapshot_identifier = "${var.project_name}-${var.environment}-db-final-snapshot"

  tags = {
    Name        = "${var.project_name}-${var.environment}-db"
    Environment = var.environment
  }
}

# Security group for RDS instance
resource "aws_security_group" "rds_sg" {
  name        = "${var.project_name}-${var.environment}-rds-sg"
  description = "Security group for RDS PostgreSQL instance"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow PostgreSQL traffic from VPC"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-rds-sg"
    Environment = var.environment
  }
}

# Subnet group for RDS instance
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "${var.project_name}-${var.environment}-rds-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = {
    Name        = "${var.project_name}-${var.environment}-rds-subnet-group"
    Environment = var.environment
  }
}

# Parameter group for RDS PostgreSQL instance
resource "aws_db_parameter_group" "rds_param_group" {
  family = "postgres13"
  name   = "${var.project_name}-${var.environment}-rds-param-group"
  description = "Custom parameter group for RDS PostgreSQL instance"

  parameter {
    name  = "max_connections"
    value = "100"
  }

  parameter {
    name  = "shared_buffers"
    value = "{DBInstanceClassMemory/32768}"
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-rds-param-group"
    Environment = var.environment
  }
}

# Human tasks (commented)
# TODO: Review and adjust the RDS instance specifications (e.g., instance class, storage) based on expected workload
# TODO: Ensure that sensitive information like database credentials are managed securely, preferably using AWS Secrets Manager or similar service
# TODO: Review and adjust security group rules to ensure they comply with security best practices and organizational policies
# TODO: Consider implementing additional security measures such as encryption at rest and in transit