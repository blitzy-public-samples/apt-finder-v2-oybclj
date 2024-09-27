# Create ElastiCache cluster
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = var.cluster_name
  engine               = "redis"
  node_type            = var.node_type
  num_cache_nodes      = var.num_cache_nodes
  parameter_group_name = "default.redis6.x"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.default.name
  security_group_ids   = [aws_security_group.redis.id]

  tags = {
    Name        = var.cluster_name
    Environment = var.environment
  }
}

# Create ElastiCache subnet group
resource "aws_elasticache_subnet_group" "default" {
  name       = "${var.cluster_name}-subnet-group"
  subnet_ids = var.subnet_ids
}

# Create security group for ElastiCache
resource "aws_security_group" "redis" {
  name        = "${var.cluster_name}-sg"
  description = "Security group for ElastiCache Redis cluster"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = var.allowed_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.cluster_name}-sg"
    Environment = var.environment
  }
}

# Human tasks (commented)
# TODO: Review and adjust the ElastiCache configuration parameters (e.g., node type, number of nodes) based on the expected load and performance requirements
# TODO: Ensure that the VPC, subnet IDs, and CIDR blocks are correctly specified in the variables file
# TODO: Consider implementing encryption at rest and in-transit for the ElastiCache cluster if handling sensitive data