variable "identifier" {
  description = "Identifier for the RDS instance"
  type        = string
  default     = "apartment-finder-db"
}

variable "engine" {
  description = "Database engine"
  type        = string
  default     = "postgres"
}

variable "engine_version" {
  description = "Version of the database engine"
  type        = string
  default     = "13.7"
}

variable "instance_class" {
  description = "The instance type of the RDS instance"
  type        = string
  default     = "db.t3.micro"
}

variable "allocated_storage" {
  description = "The allocated storage in gigabytes"
  type        = number
  default     = 20
}

variable "storage_type" {
  description = "One of 'standard' (magnetic), 'gp2' (general purpose SSD), or 'io1' (provisioned IOPS SSD)"
  type        = string
  default     = "gp2"
}

variable "storage_encrypted" {
  description = "Specifies whether the DB instance is encrypted"
  type        = bool
  default     = true
}

variable "kms_key_id" {
  description = "The ARN for the KMS encryption key. If creating an encrypted replica, set this to the destination KMS ARN"
  type        = string
  default     = null
}

variable "username" {
  description = "Username for the master DB user"
  type        = string
  default     = "dbadmin"
}

variable "password" {
  description = "Password for the master DB user. Note: This should be provided through secure means like environment variables"
  type        = string
  sensitive   = true
}

variable "port" {
  description = "The port on which the DB accepts connections"
  type        = number
  default     = 5432
}

variable "multi_az" {
  description = "Specifies if the RDS instance is multi-AZ"
  type        = bool
  default     = false
}

variable "vpc_security_group_ids" {
  description = "List of VPC security groups to associate with the RDS instance"
  type        = list(string)
}

variable "db_subnet_group_name" {
  description = "Name of DB subnet group"
  type        = string
}

variable "parameter_group_name" {
  description = "Name of the DB parameter group to associate with this instance"
  type        = string
  default     = null
}

variable "backup_retention_period" {
  description = "The days to retain backups for"
  type        = number
  default     = 7
}

variable "backup_window" {
  description = "The daily time range during which automated backups are created if automated backups are enabled"
  type        = string
  default     = "03:00-04:00"
}

variable "maintenance_window" {
  description = "The window to perform maintenance in"
  type        = string
  default     = "Mon:00:00-Mon:03:00"
}

variable "tags" {
  description = "A mapping of tags to assign to the resource"
  type        = map(string)
  default     = {}
}

# Human tasks (commented)
# TODO: Review and adjust default values for RDS instance configuration based on specific project requirements and expected load
# TODO: Ensure that sensitive information like database password is not hardcoded and is provided through secure means
# TODO: Confirm VPC, security group, and subnet configurations are correctly set up in the main Terraform configuration