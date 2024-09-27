This README file provides comprehensive information about the database component of the Apartment Finder web service, including setup instructions, configuration details, and an overview of the database models.

## Database Component Overview

The database component of the Apartment Finder web service uses PostgreSQL as the relational database management system, with SQLAlchemy as the ORM (Object-Relational Mapping) tool. It includes models for users, apartment listings, filters, subscriptions, and zipcodes.

## Setup Instructions

1. Install required dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Set up the database connection by configuring the .env file with the appropriate DATABASE_URL

3. Run database migrations using Alembic:
   ```
   alembic upgrade head
   ```

## Configuration

Database configuration is managed in `src/database/config/database.py`. Key settings include:

- DATABASE_URL: Connection string for the PostgreSQL database
- POOL_SIZE: Size of the database connection pool (default: 5)
- MAX_OVERFLOW: Maximum number of connections to overflow (default: 10)
- POOL_TIMEOUT: Timeout for acquiring a connection from the pool (default: 30 seconds)

## Database Models

The following models are defined in the `src/database/models/` directory:

- User: Represents registered users of the application
- ApartmentListing: Stores information about available apartments
- Filter: Defines user-created search filters
- Subscription: Manages user subscription information
- Zipcode: Stores zipcode data for location-based queries

## Testing

Unit tests for the database component can be run using pytest. Use the command:

```
pytest src/database/tests/
```

## Migrations

Database schema migrations are managed using Alembic. To create a new migration, use:

```
alembic revision --autogenerate -m "Description of changes"
```

<!-- Human Tasks -->
<!--
TODO: Review and update the README content to ensure all information is accurate and up-to-date

TODO: Add any additional sections that may be relevant to the database component, such as troubleshooting tips or performance optimization guidelines

TODO: Ensure that the setup instructions are clear and include all necessary steps for different environments (development, testing, production)
-->