from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime, timezone
from uuid import UUID as PyUUID, uuid4
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid
from src.database.config import get_database_engine  # Import the function to get the engine
from sqlalchemy.orm import (
    Mapped, 
    mapped_column, 
    relationship,
    DeclarativeBase
)

class Base(DeclarativeBase):
    pass
class User(Base):
    __tablename__ = 'users'
    
    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4()))
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(10), nullable=False)
    createdAt: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    updatedAt: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)
    )
    role: Mapped[str] = mapped_column(String(10), nullable=False)

engine = get_database_engine()  # Call the function to get the engine
Base.metadata.create_all(bind=engine)
