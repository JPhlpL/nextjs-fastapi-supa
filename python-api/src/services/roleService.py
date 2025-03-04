from src.repositories.roleRepository import RoleRepository
from src.schemas.schemas import Role as RoleSchema
from src.utils.logger import setup_logger
from uuid import UUID
from fastapi import HTTPException  # Import HTTPException

logger = setup_logger()

class RoleService:
    def __init__(self):
        self.role_repository = RoleRepository()

    # ====================== Database Call ==================================
    def add_new_role(self, role: RoleSchema) -> RoleSchema:
        try:
            logger.info(f"Creating new role: {role.user_id}")
            db_role = self.role_repository.create_role(role)
            return db_role
        except Exception as e:
            logger.error(f"Error in RoleService.add_new_role: {e}")
            raise Exception(f"Error in RoleService.add_new_role: {e}")
        
    def get_role(self, role_id: UUID) -> RoleSchema:
        try:
            logger.info(f"Getting role with role_id: {role_id}")
            db_role = self.role_repository.get_role(role_id)
            
            if not db_role:
                logger.warning(f"Role with role_id {role_id} not found")
                raise HTTPException(status_code=404, detail="Role not found")
            
            return db_role
        except HTTPException as e:
            # If the repository raises an HTTPException, pass it along
            raise e
        except Exception as e:
            logger.error(f"Error in RoleService.get_role: {e}")
            raise Exception(f"Error in RoleService.get_role: {e}")
        
    def get_all_roles(self) -> list[RoleSchema]:
        try:
            logger.info(f"Getting All roles")
            db_role = self.role_repository.get_all_roles()
            if not db_role:
                logger.warning(f"No roles found")
                raise HTTPException(status_code=404, detail="Roles not found")
            return db_role
        except HTTPException as e:
            raise e
    
    def get_roles_by_user(self, user_id: UUID) -> list[RoleSchema]:
        try:
            logger.info(f"Getting All roles by user")
            db_role = self.role_repository.get_roles_by_user(user_id)
            if not db_role:
                logger.warning(f"No roles found")
                raise HTTPException(status_code=404, detail="Roles not found")
            return db_role
        except HTTPException as e:
            raise e

    def update_role(self, role_id: UUID, role: RoleSchema) -> RoleSchema:
        try:
            logger.info(f"Updating role with role_id: {role_id}")
            db_role = self.role_repository.update_role(role_id, role)
            return db_role
        except Exception as e:
            logger.error(f"Error in RoleService.update_role: {e}")
            raise Exception(f"Error in RoleService.update_role: {e}")
        
    def delete_role(self, role_id: UUID) -> bool:
        try:
            logger.info(f"Deleting role with role_id: {role_id}")
            db_role = self.role_repository.delete_role(role_id)
            return db_role
        except Exception as e:
            logger.error(f"Error in RoleService.update_role: {e}")
            raise Exception(f"Error in RoleService.update_role: {e}")
    # ====================== Database Call ==================================