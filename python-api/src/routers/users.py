from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import JSONResponse
from src.services.userService import UserService
from src.schemas.schemas import (
    User as UserSchema,
    UserInfo as UserInfoSchema
)
from src.utils.logger import setup_logger
from src.utils.dependencies import valid_auth_token
# from src.middleware.logging import APIRoute
import requests
from uuid import UUID
from typing import Optional

router = APIRouter(
    prefix="/user", 
    tags=["users"],
    responses={404: {"description": "Not found"}},
    dependencies=[
         Depends(valid_auth_token)
    ]
)
logger = setup_logger() 

@router.post("/add", response_model=UserSchema)
async def add_user_endpoint(user: UserSchema) -> UserSchema:
    logger.info(f"Received request to create user: {user.email}")
    user_service = UserService()
    try:
        db_user = user_service.add_new_user(user)
        logger.info(f"User created successfully: {db_user.email}")
        return db_user
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/update/{user_id}", response_model=UserSchema)
async def update_user_endpoint(
    request: Request,
    user_id: UUID
) -> UserSchema:
    
    data = await request.json()
    user_service = UserService()
    try:
        db_user = user_service.update_user(user_id, data)
        logger.info(f"User updated successfully: {db_user.email}")
        return user_service.transform_user_model_to_schema(db_user) # Transform into Schema Display
    
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/get/{user_id}", response_model=UserSchema)
async def get_user_endpoint(user_id: UUID, user_service: UserService = Depends()) -> Optional[UserSchema]:
    try:
        return user_service.get_user(user_id)
    except HTTPException as e:
        raise e
    
@router.get("/get-all-users", response_model=list[UserSchema])
async def get_all_users_endpoint(user_service: UserService = Depends()) -> list[UserSchema]:
    try:
        return user_service.get_all_users()
    except HTTPException as e:
        raise e

@router.delete("/delete/{user_id}")
async def delete_user_endpoint(user_id: UUID, user_service: UserService = Depends())  -> JSONResponse:
    try:
        result = user_service.delete_user(user_id)
        return JSONResponse({"status": result}) 
    except HTTPException as e:
        raise e