# Project Name
variable "project_name" {
  description = "The name of the project, used for resource naming and tagging."
  type        = string
  default     = "apartment-finder"
}

# Environment
variable "environment" {
  description = "The deployment environment (e.g., dev, staging, production)."
  type        = string
  default     = "dev"
}

# AWS Region
variable "region" {
  description = "The AWS region where resources will be created."
  type        = string
  default     = "us-west-2"
}

# VPC CIDR
variable "vpc_cidr" {
  description = "The CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

# Public Subnet CIDRs
variable "public_subnet_cidrs" {
  description = "List of CIDR blocks for public subnets."
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

# Private Subnet CIDRs
variable "private_subnet_cidrs" {
  description = "List of CIDR blocks for private subnets."
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

# RDS Instance Class
variable "db_instance_class" {
  description = "The instance type of the RDS instance."
  type        = string
  default     = "db.t3.micro"
}

# Database Name
variable "db_name" {
  description = "The name of the database to create when the DB instance is created."
  type        = string
  default     = "apartment_finder_db"
}

# Database Username
variable "db_username" {
  description = "Username for the database."
  type        = string
  sensitive   = true
}

# Database Password
variable "db_password" {
  description = "Password for the database."
  type        = string
  sensitive   = true
}

# Redis Node Type
variable "redis_node_type" {
  description = "The compute and memory capacity of the nodes in the Redis cluster."
  type        = string
  default     = "cache.t3.micro"
}

# Redis Number of Cache Nodes
variable "redis_num_cache_nodes" {
  description = "The number of cache nodes in the Redis cluster."
  type        = number
  default     = 1
}

# EC2 Instance Type
variable "ec2_instance_type" {
  description = "The instance type for EC2 instances."
  type        = string
  default     = "t3.micro"
}

# EC2 Key Name
variable "key_name" {
  description = "The key name of the Key Pair to use for the EC2 instances."
  type        = string
}

# Domain Name
variable "domain_name" {
  description = "The domain name for the Apartment Finder web service."
  type        = string
}

# SSL Certificate ARN
variable "ssl_certificate_arn" {
  description = "The ARN of the SSL certificate for HTTPS."
  type        = string
}

# Human Tasks (commented)
# TODO: Review and adjust default values for variables based on specific project requirements.
# TODO: Ensure sensitive variables (db_username, db_password) are not stored in version control and are properly managed.
# TODO: Confirm the chosen AWS region (default: us-west-2) is appropriate for the project's needs.
# TODO: Verify that the CIDR blocks for VPC and subnets do not conflict with existing network configurations.
# TODO: Obtain and provide the correct key_name for EC2 instances.
# TODO: Acquire and input the domain_name for the Apartment Finder web service.
# TODO: Obtain and provide the SSL certificate ARN for HTTPS configuration.