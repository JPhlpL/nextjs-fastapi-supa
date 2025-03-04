import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.engine import Engine
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path='.env.local')

def get_database_url() -> str:
    """
    Retrieves the database URL from environment variables.
    """
    return os.getenv("MYSQL_DB_CONNECTION_WITH_PASSWORD")

def get_database_engine() -> Engine:
    """
    Creates and returns the SQLAlchemy engine using the database URL.
    """
    database_url = get_database_url()
    if database_url is None:
        raise ValueError("Database URL not set in environment variables.")
    return create_engine(url=database_url)

def create_session_local() -> Session:
    """
    Creates a new SQLAlchemy session bound to the database engine.
    """
    engine = get_database_engine()
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    return SessionLocal()
