#!/bin/bash

# Apartment Finder Database Restoration Script
# This script restores the PostgreSQL database for the Apartment Finder web service from a backup file.

# Set default values for environment variables
DB_NAME="${DB_NAME:-apartment_finder}"
DB_USER="${DB_USER:-postgres}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
BACKUP_BUCKET="${BACKUP_BUCKET:-apartment-finder-backups}"
BACKUP_FILE="${BACKUP_FILE:-latest_backup.sql}"

# Function to check if required dependencies are installed
check_dependencies() {
    local missing_deps=0

    if ! command -v psql &> /dev/null; then
        echo "Error: psql is not installed or not in PATH"
        missing_deps=1
    fi

    if ! command -v aws &> /dev/null; then
        echo "Error: AWS CLI is not installed or not in PATH"
        missing_deps=1
    fi

    return $missing_deps
}

# Function to download the backup file from S3
download_backup() {
    local temp_dir=$(mktemp -d)
    local backup_path="${temp_dir}/${BACKUP_FILE}"

    echo "Downloading backup file from S3..."
    if aws s3 cp "s3://${BACKUP_BUCKET}/${BACKUP_FILE}" "${backup_path}"; then
        echo "Backup file downloaded successfully."
        echo "${backup_path}"
    else
        echo "Error: Failed to download backup file from S3."
        rm -rf "${temp_dir}"
        exit 1
    fi
}

# Function to restore the database from the backup file
restore_database() {
    local backup_file="$1"

    echo "Dropping existing database if it exists..."
    dropdb -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" "${DB_NAME}" 2>/dev/null

    echo "Creating new empty database..."
    if ! createdb -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" "${DB_NAME}"; then
        echo "Error: Failed to create new database."
        return 1
    fi

    echo "Restoring database from backup file..."
    if psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -f "${backup_file}"; then
        echo "Database restored successfully."
        return 0
    else
        echo "Error: Failed to restore database from backup file."
        return 1
    fi
}

# Function to clean up temporary files
cleanup() {
    local backup_file="$1"
    local temp_dir=$(dirname "${backup_file}")

    echo "Cleaning up temporary files..."
    rm -rf "${temp_dir}"
}

# Main function to orchestrate the database restoration process
main() {
    echo "Starting database restoration process..."

    if ! check_dependencies; then
        echo "Error: Missing required dependencies. Please install them and try again."
        exit 1
    fi

    local backup_file=$(download_backup)

    if restore_database "${backup_file}"; then
        echo "Database restoration completed successfully."
    else
        echo "Error: Database restoration failed."
        cleanup "${backup_file}"
        exit 1
    fi

    cleanup "${backup_file}"
    echo "Database restoration process finished."
}

# Run the main function
main

# Human tasks (DO NOT REMOVE):
# - Verify and set up proper AWS credentials for S3 access
# - Ensure that the PostgreSQL connection details (host, port, user) are correctly configured in the environment or update the script accordingly
# - Test the script in a non-production environment to ensure it works as expected
# - Set up appropriate access controls and permissions for this script
# - Document the usage of this script in the project's operational runbook