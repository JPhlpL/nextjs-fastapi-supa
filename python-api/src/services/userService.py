from src.repositories.userRepository import UserRepository
from src.schemas.schemas import User as UserSchema
from src.models.models import User
from src.utils.logger import setup_logger
from uuid import UUID
from fastapi import HTTPException  # Import HTTPException


logger = setup_logger()

class UserService:
    def __init__(self):
        self.user_repository = UserRepository()

    # ====================== Database Call ==================================
    def add_new_user(self, user: UserSchema) -> UserSchema:
        try:
            logger.info(f"Creating new user: {user.email}")
            db_user = self.user_repository.create_user(user)
            return db_user
        except Exception as e:
            logger.error(f"Error in UserService.add_new_user: {e}")
            raise Exception(f"Error in UserService.add_new_user: {e}")
        
    def get_user(self, user_id: UUID) -> UserSchema:
        try:
            logger.info(f"Getting user with user_id: {user_id}")
            db_user = self.user_repository.get_user(user_id)
            
            if not db_user:
                logger.warning(f"User with user_id {user_id} not found")
                raise HTTPException(status_code=404, detail="User not found")
            
            return db_user
        except HTTPException as e:
            # If the repository raises an HTTPException, pass it along
            raise e
        except Exception as e:
            logger.error(f"Error in UserService.get_user: {e}")
            raise Exception(f"Error in UserService.get_user: {e}")
    
    def get_user_by_email(self, email: str) -> UserSchema:
        try:
            logger.info(f"Getting user with email: {email}")
            db_user = self.user_repository.get_user_by_email(email)
            
            if not db_user:
                logger.warning(f"User with email {email} not found")
                raise HTTPException(status_code=404, detail="User not found")
            
            return db_user
        except HTTPException as e:
            # If the repository raises an HTTPException, pass it along
            raise e
        except Exception as e:
            logger.error(f"Error in UserService.get_user_by_email: {e}")
            raise Exception(f"Error in UserService.get_user_by_email: {e}")
        
    def get_all_users(self) -> list[UserSchema]:
        try:
            logger.info(f"Getting All users")
            db_user = self.user_repository.get_all_users()
            if not db_user:
                logger.warning(f"No users found")
                raise HTTPException(status_code=404, detail="Users not found")
            return db_user
        except HTTPException as e:
            raise e

    def update_user(self, user_id: UUID, user: UserSchema) -> UserSchema:
        try:
            logger.info(f"Updating user with user_id: {user_id}")
            db_user = self.user_repository.update_user(user_id, user)
            return db_user
        except Exception as e:
            logger.error(f"Error in UserService.update_user: {e}")
            raise Exception(f"Error in UserService.update_user: {e}")
        
    def delete_user(self, user_id: UUID) -> bool:
        try:
            logger.info(f"Deleting user with user_id: {user_id}")
            db_user = self.user_repository.delete_user(user_id)
            return db_user
        except Exception as e:
            logger.error(f"Error in UserService.update_user: {e}")
            raise Exception(f"Error in UserService.update_user: {e}")
    # ====================== Database Call ==================================
    
    # ====================== Schema Transform ==================================

    def transform_user_model_to_schema(
        self, user: User
    ) -> UserSchema:
        return UserSchema(**user.__dict__)

    # ====================== Schema Transform ==================================