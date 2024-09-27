# infrastructure/terraform/modules/elasticache/variables.tf

# The ID of the ElastiCache cluster
variable "cluster_id" {
  type        = string
  description = "The ID of the ElastiCache cluster"
}

# The name of the cache engine to be used for the ElastiCache cluster
variable "engine" {
  type        = string
  default     = "redis"
  description = "The name of the cache engine to be used for the ElastiCache cluster"
}

# The compute and memory capacity of the nodes in the ElastiCache cluster
variable "node_type" {
  type        = string
  default     = "cache.t3.micro"
  description = "The compute and memory capacity of the nodes in the ElastiCache cluster"
}

# The number of cache nodes in the ElastiCache cluster
variable "num_cache_nodes" {
  type        = number
  default     = 1
  description = "The number of cache nodes in the ElastiCache cluster"
}

# The name of the parameter group to associate with this ElastiCache cluster
variable "parameter_group_name" {
  type        = string
  default     = "default.redis6.x"
  description = "The name of the parameter group to associate with this ElastiCache cluster"
}

# The port number on which the cache accepts connections
variable "port" {
  type        = number
  default     = 6379
  description = "The port number on which the cache accepts connections"
}

# The name of the cache subnet group to be used for the ElastiCache cluster
variable "subnet_group_name" {
  type        = string
  description = "The name of the cache subnet group to be used for the ElastiCache cluster"
}

# A list of VPC security group IDs to associate with this ElastiCache cluster
variable "security_group_ids" {
  type        = list(string)
  default     = []
  description = "A list of VPC security group IDs to associate with this ElastiCache cluster"
}

# A mapping of tags to assign to the ElastiCache cluster
variable "tags" {
  type        = map(string)
  default     = {}
  description = "A mapping of tags to assign to the ElastiCache cluster"
}

# Human tasks:
# TODO: Review and adjust default values for variables based on specific project requirements
# TODO: Ensure that the chosen node_type is appropriate for the expected cache usage
# TODO: Confirm that the parameter_group_name is compatible with the chosen Redis version