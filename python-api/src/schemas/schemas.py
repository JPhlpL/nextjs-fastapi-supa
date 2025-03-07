from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID
    
class User(BaseModel):
    id: Optional[UUID] = None
    email: Optional[str] = None
    name: Optional[str] = None
    status: Optional[str] = None
    role: Optional[str] = None
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class UserLite(BaseModel):
    name: str
    email: str
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
        