"""
Migration script to add 'position' column to learning_logs table.
Works with both PostgreSQL (production) and SQLite (local dev).

For PRODUCTION (Neon PostgreSQL):
Run this via Render shell AFTER setting DATABASE_URL environment variable.

For LOCAL (SQLite):
Run directly: python migrate_add_position.py
"""
import os
import sys
from sqlalchemy import create_engine, text, inspect
from dotenv import load_dotenv

load_dotenv()

def migrate():
    # Get database URL from environment or use local SQLite
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./portfolio.db")
    
    # Fix for Render/Heroku postgres URLs
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
    
    print(f"Connecting to database: {DATABASE_URL.split('@')[0]}...")  # Hide credentials
    
    try:
        # Create engine
        if DATABASE_URL.startswith("sqlite"):
            engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
        else:
            engine = create_engine(DATABASE_URL)
        
        # Check if column already exists
        inspector = inspect(engine)
        columns = [col['name'] for col in inspector.get_columns('learning_logs')]
        
        if 'position' in columns:
            print("✓ Column 'position' already exists. No migration needed.")
            return
        
        print("Adding 'position' column to learning_logs table...")
        
        with engine.connect() as conn:
            # Add the column with default value
            conn.execute(text("ALTER TABLE learning_logs ADD COLUMN position INTEGER DEFAULT 0"))
            
            # Set positions for existing logs based on created_at (oldest = 0)
            result = conn.execute(text("""
                SELECT id FROM learning_logs 
                ORDER BY created_at ASC
            """))
            log_ids = [row[0] for row in result]
            
            for index, log_id in enumerate(log_ids):
                conn.execute(text("UPDATE learning_logs SET position = :pos WHERE id = :id"), 
                           {"pos": index, "id": log_id})
            
            conn.commit()
            print(f"✓ Successfully added 'position' column and set positions for {len(log_ids)} existing logs.")
        
    except Exception as e:
        print(f"✗ Migration failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    migrate()
