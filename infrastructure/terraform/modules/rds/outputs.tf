output "db_instance_endpoint" {
  description = "The connection endpoint for the RDS instance"
  value       = aws_db_instance.apartment_finder_db.endpoint
}

output "db_instance_name" {
  description = "The database name"
  value       = aws_db_instance.apartment_finder_db.name
}

output "db_instance_username" {
  description = "The master username for the database"
  value       = aws_db_instance.apartment_finder_db.username
}

output "db_instance_port" {
  description = "The port on which the database accepts connections"
  value       = aws_db_instance.apartment_finder_db.port
}

output "db_instance_arn" {
  description = "The ARN of the RDS instance"
  value       = aws_db_instance.apartment_finder_db.arn
}

output "db_subnet_group_name" {
  description = "The name of the DB subnet group"
  value       = aws_db_subnet_group.apartment_finder_db_subnet_group.name
}

# Human tasks:
# TODO: Review and confirm the output values are correct and sufficient for the Apartment Finder application needs
# TODO: Ensure that sensitive information (like database credentials) is not exposed through these outputs