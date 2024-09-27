# VPC Outputs
output "vpc_id" {
  description = "The ID of the VPC created for the Apartment Finder infrastructure"
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "The IDs of the public subnets created in the VPC"
  value       = module.vpc.public_subnet_ids
}

output "private_subnet_ids" {
  description = "The IDs of the private subnets created in the VPC"
  value       = module.vpc.private_subnet_ids
}

# RDS Output
output "rds_endpoint" {
  description = "The connection endpoint for the PostgreSQL RDS instance"
  value       = module.rds.db_instance_endpoint
}

# ElastiCache Output
output "elasticache_endpoint" {
  description = "The connection endpoint for the Redis ElastiCache cluster"
  value       = module.elasticache.cache_nodes[0].address
}

# ECS Output
output "ecs_cluster_name" {
  description = "The name of the ECS cluster for deploying the Apartment Finder application"
  value       = module.ecs.cluster_name
}

# ALB Output
output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer"
  value       = module.alb.dns_name
}

# S3 Output
output "s3_bucket_name" {
  description = "The name of the S3 bucket for storing static assets"
  value       = module.s3.bucket_name
}

# CloudFront Outputs
output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution for content delivery"
  value       = module.cloudfront.distribution_id
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution"
  value       = module.cloudfront.domain_name
}

# Human Tasks (commented)
# TODO: Review and confirm that all necessary outputs are included for the Apartment Finder infrastructure
# TODO: Ensure that the output values correctly reference the modules and resources defined in the main Terraform configuration
# TODO: Verify that sensitive information is not exposed through these outputs