from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from src.services.roleService import RoleService
from src.schemas.schemas import (
    Role as RoleSchema
)
from src.utils.logger import setup_logger
from src.utils.dependencies import valid_auth_token
# from src.middleware.logging import APIRoute
import requests
from uuid import UUID

router = APIRouter(
    prefix="/role", 
    tags=["roles"],
    responses={404: {"description": "Not found"}},
    dependencies=[
         Depends(valid_auth_token)
    ]
)
logger = setup_logger() 

@router.post("/add", response_model=RoleSchema)
async def add_role_endpoint(role: RoleSchema):
    logger.info(f"Received request to create role: {role.user_id}")
    role_service = RoleService()
    try:
        db_role = role_service.add_new_role(role)
        logger.info(f"Role created successfully: {db_role.user_id}")
        return db_role
    except Exception as e:
        logger.error(f"Error creating role: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/update/{role_id}", response_model=RoleSchema)
async def update_role_endpoint(role_id: UUID, role: RoleSchema):
    logger.info(f"Received request to create role: {role.user_id}")
    role_service = RoleService()
    try:
        db_role = role_service.update_role(role_id, role)
        logger.info(f"Role created successfully: {db_role.user_id}")
        return db_role
    except Exception as e:
        logger.error(f"Error creating role: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/get-roles-by-user/{user_id}", response_model=list[RoleSchema])
async def get_roles_by_user_endpoint(user_id: UUID, role_service: RoleService = Depends()):
    try:
        return role_service.get_roles_by_user(user_id)
    except HTTPException as e:
        raise e
    
@router.get("/get/{role_id}", response_model=RoleSchema)
async def get_role_endpoint(role_id: UUID, role_service: RoleService = Depends()):
    try:
        return role_service.get_role(role_id)
    except HTTPException as e:
        raise e
    
@router.get("/get-all-roles", response_model=list[RoleSchema])
async def get_all_roles_endpoint(role_service: RoleService = Depends()):
    try:
        return role_service.get_all_roles()
    except HTTPException as e:
        raise e

@router.delete("/delete/{role_id}")
async def delete_role_endpoint(role_id: UUID, role_service: RoleService = Depends())  -> JSONResponse:
    try:
        result = role_service.delete_role(role_id)
        return JSONResponse({"status": result}) 
    except HTTPException as e:
        raise e