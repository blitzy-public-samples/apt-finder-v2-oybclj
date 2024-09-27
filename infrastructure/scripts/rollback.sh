#!/bin/bash

# Apartment Finder Web Service Rollback Script
# This script performs a rollback of the application to a previous stable version

# Function to log messages
log_message() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to rollback the database
rollback_database() {
    local DB_BACKUP_PATH=$1
    log_message "Starting database rollback..."
    
    # Stop the database service
    sudo systemctl stop postgresql
    
    # Restore database from backup
    sudo -u postgres pg_restore -d apartment_finder $DB_BACKUP_PATH
    
    if [ $? -eq 0 ]; then
        log_message "Database restored successfully"
        # Start the database service
        sudo systemctl start postgresql
        # Verify database connectivity
        if sudo -u postgres psql -d apartment_finder -c '\l' > /dev/null 2>&1; then
            log_message "Database connectivity verified"
            return 0
        else
            log_message "Error: Unable to connect to the database after restore"
            return 1
        fi
    else
        log_message "Error: Database restore failed"
        return 1
    fi
}

# Function to update load balancer
update_load_balancer() {
    local NEW_BACKEND_ADDRESS=$1
    log_message "Updating load balancer configuration..."
    
    # Update Nginx configuration (assuming Nginx is used as the load balancer)
    sudo sed -i "s/server .*/server $NEW_BACKEND_ADDRESS;/" /etc/nginx/sites-available/apartment_finder
    
    # Reload Nginx
    sudo nginx -t && sudo systemctl reload nginx
    
    if [ $? -eq 0 ]; then
        log_message "Load balancer updated successfully"
        return 0
    else
        log_message "Error: Failed to update load balancer"
        return 1
    fi
}

# Main rollback function
rollback_application() {
    local ROLLBACK_VERSION=$1
    
    # Check if ROLLBACK_VERSION is provided
    if [ -z "$ROLLBACK_VERSION" ]; then
        log_message "Error: Rollback version not provided"
        return 1
    fi
    
    log_message "Starting rollback process to version $ROLLBACK_VERSION"
    
    # Validate ROLLBACK_VERSION exists in version control
    if ! git rev-parse --verify $ROLLBACK_VERSION >/dev/null 2>&1; then
        log_message "Error: Invalid rollback version"
        return 1
    fi
    
    # Stop current running services
    log_message "Stopping current services..."
    docker-compose down
    
    # Rollback database
    DB_BACKUP_PATH="/path/to/database/backups/apartment_finder_${ROLLBACK_VERSION}.sql"
    if rollback_database $DB_BACKUP_PATH; then
        log_message "Database rollback successful"
    else
        log_message "Error: Database rollback failed"
        return 1
    fi
    
    # Checkout the specified version from version control
    log_message "Checking out version $ROLLBACK_VERSION"
    git checkout $ROLLBACK_VERSION
    
    # Build and deploy the rolled back version
    log_message "Building and deploying rolled back version..."
    docker-compose build
    docker-compose up -d
    
    # Run smoke tests
    log_message "Running smoke tests..."
    # Add your smoke test command here
    # Example: pytest tests/smoke
    
    # Update load balancer
    NEW_BACKEND_ADDRESS="localhost:8000"  # Update this with the correct address
    if update_load_balancer $NEW_BACKEND_ADDRESS; then
        log_message "Load balancer updated successfully"
    else
        log_message "Error: Failed to update load balancer"
        return 1
    fi
    
    log_message "Rollback to version $ROLLBACK_VERSION completed successfully"
    return 0
}

# Main execution
if [ $# -eq 0 ]; then
    log_message "Error: No rollback version provided"
    echo "Usage: $0 <rollback_version>"
    exit 1
fi

ROLLBACK_VERSION=$1

if rollback_application $ROLLBACK_VERSION; then
    log_message "Rollback process completed successfully"
    exit 0
else
    log_message "Rollback process failed"
    exit 1
fi

# Human tasks (commented):
# TODO: Define specific database backup naming convention and location
# TODO: Set up monitoring and alerting for rollback events
# TODO: Create a runbook for manual intervention if automatic rollback fails