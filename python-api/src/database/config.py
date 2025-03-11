import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.engine import Engine
from dotenv import load_dotenv
from typing import Iterator

# Load environment variables
load_dotenv(dotenv_path='.env.local')

def get_database_url() -> str:
    """
    Retrieves the database URL from environment variables.
    """
    db_env = os.getenv("POSTGRE_DB_CONNECTION_WITH_PASSWORD")
    if not db_env:
        raise ValueError("POSTGRE_DB_CONNECTION_WITH_PASSWORD is not set")
    return db_env

def get_database_engine() -> Engine:
    """
    Creates and returns the SQLAlchemy engine using the database URL.
    """
    database_url = get_database_url()
    if database_url is None:
        # Ensure the database URL is provided; if not, raise an error
        raise ValueError("DATABASE_URL environment variable is not set.")
    # Create and return a SQLAlchemy Engine instance for synchronous operations
    return create_engine(
        url=database_url,
        echo=False,  # Turn to True if you want to see the SQL queries
        # poolclass=NullPool,
        pool_size=50,  # Slightly reduce pool size to prevent overuse
        max_overflow=20,  # Limit overflow to reduce spike risks
        pool_pre_ping=True,  # Enables a pre-ping to test connections before use
        pool_recycle=1800,  # Recycle connections after 30 minutes
        connect_args={
            "keepalives": 1,  # Enable TCP keepalive
            "keepalives_idle": 120,  # Start sending keepalives if idle for 2 minutes
            "keepalives_interval": 30,  # Interval between keepalives is 30 seconds
            "keepalives_count": 3,  # Maximum number of keepalives before disconnecting
        },
    )

def create_session_local() -> Session:
    """
    Returns a new Session instance using the existing engine.
    """
    return SessionLocal()


# Currently not using this.
def get_db() -> Iterator[Session]:
    db = create_session_local()
    try:
        yield db
    except Exception:
        db.rollback()
    finally:
        db.close()

engine = get_database_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)