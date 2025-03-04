from sqlalchemy.orm import Session
from src.models.models import Role
from src.wrappers.dbSessionWrapper import with_db_session
from sqlalchemy import select
from src.utils.logger import setup_logger
from uuid import UUID
import bcrypt
from datetime import datetime, timezone
logger = setup_logger()


class RoleRepository:
    
    @with_db_session
    def get_role(self, role_id: UUID, scoped_db: Session) -> Role:
        try:
            logger.info(f"Fetching role with ID: {role_id}")
            db_role = scoped_db.query(Role).filter(Role.id == str(role_id)).first()

            if not db_role:
              return None
          
            logger.info(f"Role with ID: {role_id} found.")
            return db_role
        
        except Exception as e:
            logger.error(f"Error getting role with ID {role_id}: {e}")
            raise Exception(f"Error in RoleRepository.get_role: {e}")
        
    @with_db_session
    def get_all_roles(self, scoped_db: Session) -> list[Role]:
        try:
            logger.info(f"Fetching all roles")
            db_role = scoped_db.query(Role).all()

            if not db_role:
              logger.info(f"No roles found")
              return None
          
            
            return db_role
        
        except Exception as e:
            logger.error(f"Error getting role all roles: {e}")
            raise Exception(f"Error in RoleRepository.get_all_roles: {e}")
    
    @with_db_session
    def get_roles_by_user(self, user_id: UUID, scoped_db: Session) -> list[Role]:
        try:
            logger.info(f"Fetching all roles")
            db_role = scoped_db.query(Role).filter(Role.user_id == str(user_id))

            if not db_role:
              logger.info(f"No roles found")
              return None
            
            return db_role
        
        except Exception as e:
            logger.error(f"Error getting role all roles: {e}")
            raise Exception(f"Error in RoleRepository.get_all_roles: {e}")
        
    @with_db_session
    def create_role(self, role: Role, scoped_db: Session) -> Role:
        try:
            logger.info(f"Creating role: {role.user_id}")
            
            db_role = Role(
                title=role.title,
                user_id=role.user_id
            )
            scoped_db.add(db_role)
            scoped_db.commit()
            scoped_db.refresh(db_role)
            logger.info(f"Role created successfully: {db_role.user_id}")
            return db_role
        except Exception as e:
            logger.error(f"Error creating role: {e}")
            raise Exception(f"Error in RoleRepository.create_role: {e}")
        
    @with_db_session
    def update_role(self, role_id: UUID, role: Role, scoped_db: Session ) -> Role:
        try:
            logger.info(f"Updating role with ID: {role_id}")
            db_role = scoped_db.query(Role).filter(Role.id == str(role_id)).first()

            if db_role:
                # Update fields except id and createdAt
                if role.title:
                    db_role.title = role.title
                if role.user_id:
                    db_role.user_id = role.user_id
                db_role.updatedAt = datetime.now(timezone.utc)

                scoped_db.commit()
                scoped_db.refresh(db_role)
                return db_role
            else:
                raise Exception("Role not found")
        except Exception as e:
            logger.error(f"Error updating role in repository: {e}")
            scoped_db.rollback()
            raise Exception(f"Error in RoleRepository.update_role: {e}")
        
    @with_db_session
    def delete_role(self, role_id: UUID, scoped_db: Session) -> bool:
        try:
            logger.info(f"Deleting role with ID: {role_id}")
            
            query = (
               scoped_db.query(Role).filter(Role.id == str(role_id)).first()
            )
            if query:
                scoped_db.delete(query)
                scoped_db.commit()
                logger.info(f"Deleted role with ID: {role_id}")
                return True
            
            logger.info(f"No role with ID: {role_id} found")
            return False
            
        except Exception as e:
            logger.error(f"Error deleting role with ID {role_id}: {e}")
            raise Exception(f"Error in RoleRepository.delete_role: {e}")