variable "project_name" {
  type        = string
  description = "The name of the project, used for naming resources"
  default     = "apartment-finder"
}

variable "environment" {
  type        = string
  description = "The deployment environment (e.g., dev, staging, prod)"
  default     = "dev"
}

variable "vpc_id" {
  type        = string
  description = "The ID of the VPC where the ECS cluster will be deployed"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "List of private subnet IDs where ECS tasks will be placed"
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "List of public subnet IDs for the Application Load Balancer"
}

variable "ecs_cluster_name" {
  type        = string
  description = "Name of the ECS cluster"
  default     = "apartment-finder-cluster"
}

variable "ecs_task_execution_role_name" {
  type        = string
  description = "Name of the ECS task execution IAM role"
  default     = "apartment-finder-task-execution-role"
}

variable "backend_container_image" {
  type        = string
  description = "Docker image for the backend service"
}

variable "frontend_container_image" {
  type        = string
  description = "Docker image for the frontend service"
}

variable "backend_container_port" {
  type        = number
  description = "Port on which the backend container listens"
  default     = 8000
}

variable "frontend_container_port" {
  type        = number
  description = "Port on which the frontend container listens"
  default     = 3000
}

variable "backend_cpu" {
  type        = number
  description = "CPU units for the backend task"
  default     = 256
}

variable "backend_memory" {
  type        = number
  description = "Memory (in MiB) for the backend task"
  default     = 512
}

variable "frontend_cpu" {
  type        = number
  description = "CPU units for the frontend task"
  default     = 256
}

variable "frontend_memory" {
  type        = number
  description = "Memory (in MiB) for the frontend task"
  default     = 512
}

variable "desired_count" {
  type        = number
  description = "Desired number of tasks running for each service"
  default     = 2
}

variable "health_check_path" {
  type        = string
  description = "Path for the ALB health check"
  default     = "/health"
}

variable "db_host" {
  type        = string
  description = "Hostname of the PostgreSQL database"
}

variable "db_port" {
  type        = number
  description = "Port of the PostgreSQL database"
  default     = 5432
}

variable "redis_host" {
  type        = string
  description = "Hostname of the Redis cache"
}

variable "redis_port" {
  type        = number
  description = "Port of the Redis cache"
  default     = 6379
}

# Human tasks (commented)
# TODO: Review and adjust default values for CPU, memory, and desired count based on expected load and performance requirements
# TODO: Ensure that the specified container images are available and up-to-date in the container registry
# TODO: Verify that the health check path is correct for both frontend and backend services