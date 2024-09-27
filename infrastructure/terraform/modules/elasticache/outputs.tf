output "elasticache_cluster_id" {
  description = "The ID of the ElastiCache cluster"
  value       = aws_elasticache_cluster.redis.id
}

output "elasticache_endpoint" {
  description = "The endpoint of the ElastiCache cluster"
  value       = aws_elasticache_cluster.redis.cache_nodes[0].address
}

output "elasticache_port" {
  description = "The port number of the ElastiCache cluster"
  value       = aws_elasticache_cluster.redis.port
}

# Human tasks:
# TODO: Verify if additional outputs are needed for the ElastiCache module
# TODO: Ensure that the output values align with the actual resource names and attributes in the main ElastiCache module file