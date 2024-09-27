# Output the ID of the ECS cluster
output "ecs_cluster_id" {
  description = "The ID of the ECS cluster"
  value       = aws_ecs_cluster.main.id
}

# Output the ARN of the ECS cluster
output "ecs_cluster_arn" {
  description = "The ARN of the ECS cluster"
  value       = aws_ecs_cluster.main.arn
}

# Output the name of the ECS cluster
output "ecs_cluster_name" {
  description = "The name of the ECS cluster"
  value       = aws_ecs_cluster.main.name
}

# Output the ID of the ECS service
output "ecs_service_id" {
  description = "The ID of the ECS service"
  value       = aws_ecs_service.main.id
}

# Output the name of the ECS service
output "ecs_service_name" {
  description = "The name of the ECS service"
  value       = aws_ecs_service.main.name
}

# Output the ARN of the ECS task definition
output "ecs_task_definition_arn" {
  description = "The ARN of the ECS task definition"
  value       = aws_ecs_task_definition.main.arn
}

# Output the family of the ECS task definition
output "ecs_task_definition_family" {
  description = "The family of the ECS task definition"
  value       = aws_ecs_task_definition.main.family
}

# Output the revision of the ECS task definition
output "ecs_task_definition_revision" {
  description = "The revision of the ECS task definition"
  value       = aws_ecs_task_definition.main.revision
}

# Human tasks (commented out as they are not part of the actual Terraform code)
# TODO: Review and adjust the outputs based on the specific ECS resources created in the main.tf file of this module
# TODO: Ensure that all necessary outputs are included for integration with other modules or the root module