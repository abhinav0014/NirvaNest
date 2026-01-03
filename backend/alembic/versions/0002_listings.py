"""create listings

Revision ID: 0002_listings
Revises: 0001_initial
Create Date: 2026-01-02 00:00:01.000000
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '0002_listings'
down_revision = '0001_initial'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'listings',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column('owner_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id'), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('price', sa.Integer(), nullable=True),
        sa.Column('currency', sa.String(length=3), nullable=False, server_default='NPR'),
        sa.Column('is_auction', sa.Boolean(), nullable=False, server_default=sa.text('false')),
        sa.Column('negotiable', sa.Boolean(), nullable=False, server_default=sa.text('false')),
        sa.Column('category', sa.String(), nullable=True),
        sa.Column('location', sa.String(), nullable=True),
        sa.Column('is_published', sa.Boolean(), nullable=False, server_default=sa.text('true')),
        sa.Column('deleted', sa.Boolean(), nullable=False, server_default=sa.text('false')),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index(op.f('ix_listings_owner_id'), 'listings', ['owner_id'], unique=False)


def downgrade():
    op.drop_index(op.f('ix_listings_owner_id'), table_name='listings')
    op.drop_table('listings')
