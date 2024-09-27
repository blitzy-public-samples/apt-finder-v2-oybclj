#!/bin/bash

# Apartment Finder Database Backup Script
# This script performs automated backups of the PostgreSQL database used by the Apartment Finder web service.

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Function to check if required dependencies are installed
check_dependencies() {
    if ! command -v psql &> /dev/null; then
        echo "Error: postgresql-client is not installed."
        exit 1
    fi

    if ! command -v aws &> /dev/null; then
        echo "Error: aws-cli is not installed."
        exit 1
    fi

    return 0
}

# Function to create a backup of the PostgreSQL database
create_backup() {
    timestamp=$(date +"%Y%m%d_%H%M%S")
    backup_file="${BACKUP_DIR}/apartment_finder_backup_${timestamp}.sql.gz"

    # Create backup directory if it doesn't exist
    mkdir -p "${BACKUP_DIR}"

    # Use pg_dump to create a compressed backup of the database
    PGPASSWORD="${DB_PASSWORD}" pg_dump -h "${DB_HOST}" -U "${DB_USER}" -d "${DB_NAME}" | gzip > "${backup_file}"

    if [ $? -eq 0 ]; then
        echo "Backup created successfully: ${backup_file}"
        echo "${backup_file}"
    else
        echo "Error: Failed to create backup."
        exit 1
    fi
}

# Function to upload the backup file to Amazon S3
upload_to_s3() {
    local backup_file="$1"
    aws s3 cp "${backup_file}" "s3://${S3_BUCKET}/" --storage-class STANDARD_IA

    if [ $? -eq 0 ]; then
        echo "Backup uploaded successfully to S3 bucket: ${S3_BUCKET}"
        return 0
    else
        echo "Error: Failed to upload backup to S3."
        return 1
    fi
}

# Function to remove local backup file after successful upload
cleanup() {
    local backup_file="$1"
    if [ -f "${backup_file}" ]; then
        rm "${backup_file}"
        echo "Local backup file removed: ${backup_file}"
        return 0
    else
        echo "Error: Local backup file not found."
        return 1
    fi
}

# Main function to orchestrate the backup process
main() {
    echo "Starting database backup process..."

    check_dependencies
    if [ $? -ne 0 ]; then
        echo "Error: Dependencies check failed."
        exit 1
    fi

    backup_file=$(create_backup)
    if [ $? -ne 0 ]; then
        echo "Error: Backup creation failed."
        exit 1
    fi

    upload_to_s3 "${backup_file}"
    if [ $? -eq 0 ]; then
        cleanup "${backup_file}"
    else
        echo "Warning: Backup file not removed due to upload failure."
    fi

    echo "Database backup process completed."
}

# Execute the main function
main

# Human tasks (DO NOT REMOVE THIS SECTION)
: <<'HUMAN_TASKS'
- Set up appropriate IAM roles and permissions for S3 bucket access
- Configure environment variables for database credentials in the deployment environment
- Set up a cron job or other scheduling mechanism to run this script regularly
- Implement a backup retention policy and script to manage old backups in S3
HUMAN_TASKS