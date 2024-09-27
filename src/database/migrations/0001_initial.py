"""Initial database migration for the Apartment Finder application."""

import sqlalchemy as sa
from alembic import op

# Revision identifiers, used by Alembic.
revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    """Creates the initial database schema for the Apartment Finder application."""
    
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
        sa.Column('last_login', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )

    # Create zipcodes table
    op.create_table(
        'zipcodes',
        sa.Column('zipcode', sa.String(length=10), nullable=False),
        sa.Column('city', sa.String(length=100), nullable=False),
        sa.Column('state', sa.String(length=50), nullable=False),
        sa.PrimaryKeyConstraint('zipcode')
    )

    # Create apartment_listings table
    op.create_table(
        'apartment_listings',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('date_on_market', sa.Date(), nullable=False),
        sa.Column('rent', sa.Numeric(precision=10, scale=2), nullable=False),
        sa.Column('broker_fee', sa.Numeric(precision=10, scale=2), nullable=True),
        sa.Column('square_footage', sa.Integer(), nullable=True),
        sa.Column('bedrooms', sa.Integer(), nullable=False),
        sa.Column('bathrooms', sa.Integer(), nullable=False),
        sa.Column('available_date', sa.Date(), nullable=True),
        sa.Column('street_address', sa.String(length=255), nullable=False),
        sa.Column('zillow_url', sa.String(length=512), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), onupdate=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Create filters table
    op.create_table(
        'filters',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('criterion', sa.JSON(), nullable=False),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), onupdate=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create subscriptions table
    op.create_table(
        'subscriptions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('start_date', sa.Date(), nullable=False),
        sa.Column('end_date', sa.Date(), nullable=False),
        sa.Column('status', sa.String(length=20), nullable=False),
        sa.Column('paypal_subscription_id', sa.String(length=255), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(), server_default=sa.text('now()'), onupdate=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create filter_zipcodes table (for many-to-many relationship)
    op.create_table(
        'filter_zipcodes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('filter_id', sa.Integer(), nullable=False),
        sa.Column('zipcode', sa.String(length=10), nullable=False),
        sa.ForeignKeyConstraint(['filter_id'], ['filters.id'], ),
        sa.ForeignKeyConstraint(['zipcode'], ['zipcodes.zipcode'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create listing_zipcodes table (for many-to-many relationship)
    op.create_table(
        'listing_zipcodes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('listing_id', sa.Integer(), nullable=False),
        sa.Column('zipcode', sa.String(length=10), nullable=False),
        sa.ForeignKeyConstraint(['listing_id'], ['apartment_listings.id'], ),
        sa.ForeignKeyConstraint(['zipcode'], ['zipcodes.zipcode'], ),
        sa.PrimaryKeyConstraint('id')
    )

    # Create indexes for frequently queried fields
    op.create_index(op.f('ix_apartment_listings_rent'), 'apartment_listings', ['rent'], unique=False)
    op.create_index(op.f('ix_apartment_listings_bedrooms'), 'apartment_listings', ['bedrooms'], unique=False)
    op.create_index(op.f('ix_apartment_listings_bathrooms'), 'apartment_listings', ['bathrooms'], unique=False)
    op.create_index(op.f('ix_apartment_listings_square_footage'), 'apartment_listings', ['square_footage'], unique=False)
    op.create_index(op.f('ix_apartment_listings_available_date'), 'apartment_listings', ['available_date'], unique=False)


def downgrade():
    """Removes all tables created in the upgrade function."""
    
    # Drop tables in reverse order of creation
    op.drop_table('listing_zipcodes')
    op.drop_table('filter_zipcodes')
    op.drop_table('subscriptions')
    op.drop_table('filters')
    op.drop_table('apartment_listings')
    op.drop_table('zipcodes')
    op.drop_table('users')

# Human tasks:
# 1. Review the migration to ensure all necessary tables and fields are included as per the project requirements.
# 2. Verify that appropriate indexes are created for fields that will be frequently queried.
# 3. Consider adding any additional constraints or foreign key relationships that may be necessary.