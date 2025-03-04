from sqlalchemy.orm import Session
from src.models.models import User
from src.wrappers.dbSessionWrapper import with_db_session
from sqlalchemy import select
from src.utils.logger import setup_logger
from uuid import UUID
import bcrypt
from datetime import datetime, timezone
logger = setup_logger()


class UserRepository:
    
    @with_db_session
    def get_user(self, user_id: UUID, scoped_db: Session) -> User:
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
    def get_user_by_username(self, username: str, scoped_db: Session) -> User:
        try:
            logger.info(f"Fetching user with ID: {username}")
            db_user = scoped_db.query(User).filter(User.username == str(username)).first()

            if not db_user:
              return None
          
            logger.info(f"User with username: {username} found.")
            return db_user
        
        except Exception as e:
            logger.error(f"Error getting user with Username {username}: {e}")
            raise Exception(f"Error in UserRepository.get_user_by_username: {e}")
        
    @with_db_session
    def get_all_users(self, scoped_db: Session) -> list[User]:
        try:
            logger.info(f"Fetching all users")
            db_user = scoped_db.query(User).all()

            if not db_user:
              logger.info(f"No users found")
              return None
          
            
            return db_user
        
        except Exception as e:
            logger.error(f"Error getting user all users: {e}")
            raise Exception(f"Error in UserRepository.get_all_users: {e}")
        
    @with_db_session
    def create_user(self, user: User, scoped_db: Session) -> User:
        try:
            logger.info(f"Creating user: {user.username}")
            
            # Bcrypting Password
            user_password = user.password
            bytes = user_password.encode('utf-8') 
            salt = bcrypt.gensalt() 
            hash = bcrypt.hashpw(bytes, salt)
            
            db_user = User(
                email=user.email,
                username=user.username,
                password=hash
            )
            scoped_db.add(db_user)
            scoped_db.commit()
            scoped_db.refresh(db_user)
            logger.info(f"User created successfully: {db_user.username}")
            return db_user
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            raise Exception(f"Error in UserRepository.create_user: {e}")
        
    @with_db_session
    def update_user(self, user_id: UUID, user: User, scoped_db: Session ) -> User:
        try:
            logger.info(f"Updating user with ID: {user_id}")
            db_user = scoped_db.query(User).filter(User.id == str(user_id)).first()

            if db_user:
                # Update fields except id and createdAt
                if user.email:
                    db_user.email = user.email
                if user.username:
                    db_user.username = user.username
                if user.password:
                    db_user.password = user.password
                db_user.updatedAt = datetime.now(timezone.utc)

                scoped_db.commit()
                scoped_db.refresh(db_user)
                return db_user
            else:
                raise Exception("User not found")
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