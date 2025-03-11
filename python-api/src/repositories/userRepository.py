from sqlalchemy.orm import Session, selectinload
from sqlalchemy import update
from src.models.models import User
from src.wrappers.dbSessionWrapper import with_db_session
from src.utils.logger import setup_logger
from uuid import UUID
from datetime import datetime, timezone
from typing import Optional, Any
logger = setup_logger()


class UserRepository:
    
    @with_db_session
    def get_user(self, user_id: UUID, scoped_db: Session) -> Optional[User]:
        try:
            logger.info(f"Fetching user with ID: {user_id}")
            db_user = scoped_db.query(User).filter(User.id == str(user_id)).first()

            if not db_user:
              return None
          
            logger.info(f"User with ID: {user_id} found.")
            return db_user
        
        except Exception as e:
            logger.error(f"Error getting user with ID {user_id}: {e}")
            raise Exception(f"Error in UserRepository.get_user: {e}")
        
    @with_db_session
    def get_user_by_email(self, email: str, scoped_db: Session) -> Optional[User]:
        try:
            logger.info(f"Fetching user with ID: {email}")
            db_user = scoped_db.query(User).filter(User.email == str(email)).first()

            if not db_user:
              return None
          
            logger.info(f"User with email: {email} found.")
            return db_user
        
        except Exception as e:
            logger.error(f"Error getting user with email {email}: {e}")
            raise Exception(f"Error in UserRepository.get_user_by_email: {e}")
        
    @with_db_session
    def get_all_users(self, scoped_db: Session) -> list[User]:
        try:
            logger.info("Fetching all users")
            db_users = (
                scoped_db.query(User)
                # .options(selectinload(User.roles)) # For join, and need to use selectinload linkage to the class if need to join, also if needed always on fetching
                .all()
            )
            return db_users
        except Exception as e:
            logger.error(f"Error getting all users: {e}")
            raise Exception(f"Error in UserRepository.get_all_users: {e}")
        
    @with_db_session
    def create_user(self, user: User, scoped_db: Session) -> User:
        try:
            logger.info(f"Creating user: {user.email}")
            
            db_user = User(
                email=user.email,
                name=user.name
            )
            scoped_db.add(db_user)
            scoped_db.commit()
            scoped_db.refresh(db_user)
            logger.info(f"User created successfully: {db_user.email}")
            return db_user
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            raise Exception(f"Error in UserRepository.create_user: {e}")
        
    @with_db_session
    def update_user(self, user_id: UUID, updated_data: dict[str, Any], scoped_db: Session) -> User:
        try:
            logger.info(f"Updating user with ID: {user_id}")

            # Create the update statement
            update_stmt = (
                update(User)
                .where(User.id == str(user_id))
                .values(**updated_data)
                .execution_options(synchronize_session="fetch")
            )

            # Execute the update statement
            result = scoped_db.execute(update_stmt)
            scoped_db.commit()

            # Check if any rows were updated
            if result.rowcount == 0:
                raise ValueError(f"User  with ID {user_id} was not found or no changes were made.")

            # Fetch the updated user
            updated_user = (
                scoped_db.query(User)
                .filter(User.id == str(user_id))
                .first()
            )

            if updated_user is None:
                raise ValueError(f"User  with ID {user_id} was not found after update.")

            logger.info(f"User  with ID: {user_id} updated successfully.")
            return updated_user

        except Exception as e:
            logger.error(f"Error updating user in repository: {e}")
            scoped_db.rollback()
            raise Exception(f"Error in UserRepository.update_user: {e}")
        
    @with_db_session
    def delete_user(self, user_id: UUID, scoped_db: Session) -> bool:
        try:
            logger.info(f"Deleting user with ID: {user_id}")
            
            query = (
               scoped_db.query(User).filter(User.id == str(user_id)).first()
            )
            if query:
                scoped_db.delete(query)
                scoped_db.commit()
                logger.info(f"Deleted user with ID: {user_id}")
                return True
            
            logger.info(f"No user with ID: {user_id} found")
            return False
            
        except Exception as e:
            logger.error(f"Error deleting user with ID {user_id}: {e}")
            raise Exception(f"Error in UserRepository.delete_user: {e}")