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
        
class Employee(BaseModel):
    id: UUID
    employeeId: str
    firstName: str
    lastName: str
    department: str
    section: str
    position: str
    jobLevel: str
    serviceYears: int
    dateHired: datetime
    createdAt: datetime
    updatedAt: datetime

class UserInfo(BaseModel):
    
    user_info: UserLite
    employee_info: Employee
    class Config:
        from_attributes = True

# class Permission(BaseModel):
#     id: UUID
#     description: str
#     username: str
#     password: str

#     class Config:
#         from_attributes = True
        