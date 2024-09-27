#!/bin/bash

# Apartment Finder Web Service Deployment Script
# This script deploys the Apartment Finder web service to the production environment

# Exit immediately if a command exits with a non-zero status
set -e

# Function to check if required dependencies are installed
check_dependencies() {
    echo "Checking dependencies..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        echo "Docker is not installed. Please install Docker and try again."
        exit 1
    fi
    
    # Check if kubectl is installed and configured
    if ! command -v kubectl &> /dev/null; then
        echo "kubectl is not installed. Please install kubectl and configure it for your Kubernetes cluster."
        exit 1
    fi
    
    # Check if necessary environment variables are set
    if [ -z "$DOCKER_REGISTRY" ] || [ -z "$KUBERNETES_NAMESPACE" ]; then
        echo "Required environment variables are not set. Please set DOCKER_REGISTRY and KUBERNETES_NAMESPACE."
        exit 1
    fi
    
    echo "All dependencies are satisfied."
    return 0
}

# Function to build Docker images for frontend and backend
build_docker_images() {
    echo "Building Docker images..."
    
    # Navigate to the frontend directory and build the image
    cd src/frontend
    docker build -t $DOCKER_REGISTRY/apartment-finder-frontend:latest .
    
    # Navigate to the backend directory and build the image
    cd ../backend
    docker build -t $DOCKER_REGISTRY/apartment-finder-backend:latest .
    
    echo "Docker images built successfully."
    return 0
}

# Function to push Docker images to the container registry
push_docker_images() {
    echo "Pushing Docker images to registry..."
    
    # Log in to the container registry
    # Note: Ensure that DOCKER_USERNAME and DOCKER_PASSWORD are set in the environment
    echo "$DOCKER_PASSWORD" | docker login $DOCKER_REGISTRY -u "$DOCKER_USERNAME" --password-stdin
    
    # Push the frontend image
    docker push $DOCKER_REGISTRY/apartment-finder-frontend:latest
    
    # Push the backend image
    docker push $DOCKER_REGISTRY/apartment-finder-backend:latest
    
    echo "Docker images pushed successfully."
    return 0
}

# Function to update Kubernetes deployments
update_kubernetes_deployments() {
    echo "Updating Kubernetes deployments..."
    
    # Update frontend deployment
    kubectl set image deployment/frontend frontend=$DOCKER_REGISTRY/apartment-finder-frontend:latest -n $KUBERNETES_NAMESPACE
    
    # Update backend deployment
    kubectl set image deployment/backend backend=$DOCKER_REGISTRY/apartment-finder-backend:latest -n $KUBERNETES_NAMESPACE
    
    # Wait for rollout to complete
    kubectl rollout status deployment/frontend -n $KUBERNETES_NAMESPACE
    kubectl rollout status deployment/backend -n $KUBERNETES_NAMESPACE
    
    echo "Kubernetes deployments updated successfully."
    return 0
}

# Function to run database migrations
run_database_migrations() {
    echo "Running database migrations..."
    
    # Get the name of the backend pod
    BACKEND_POD=$(kubectl get pods -n $KUBERNETES_NAMESPACE -l app=backend -o jsonpath="{.items[0].metadata.name}")
    
    # Run migrations
    kubectl exec -it $BACKEND_POD -n $KUBERNETES_NAMESPACE -- python manage.py migrate
    
    echo "Database migrations completed successfully."
    return 0
}

# Main function to orchestrate the deployment process
main() {
    echo "Starting deployment process for Apartment Finder web service..."
    
    check_dependencies
    build_docker_images
    push_docker_images
    update_kubernetes_deployments
    run_database_migrations
    
    echo "Deployment completed successfully!"
    return 0
}

# Execute the main function
main

# Human tasks (commented out):
# TODO: Provide actual container registry URL and credentials
# TODO: Ensure Kubernetes cluster details and credentials are correctly configured
# TODO: Verify and provide necessary environment variables