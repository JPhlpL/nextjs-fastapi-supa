from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID
class User(BaseModel):
    id: Optional[UUID] = None
    email: str
    username: str
    password: Optional[str] = None
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None
    class Config:
        from_attributes = True
    
class UserLite(BaseModel):
    email: str
    username: str
    class Config:
        from_attributes = True

class Role(BaseModel):
    id: Optional[UUID] = None
    title: str
    user_id: UUID
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None
    class Config:
        from_attributes = True
class UserInfo(BaseModel):
    
    user_info: UserLite
    class Config:
        from_attributes = True

# class Permission(BaseModel):
#     id: UUID
#     description: str
#     username: str
#     password: str

#     class Config:
#         from_attributes = True
        