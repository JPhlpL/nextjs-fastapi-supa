from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from src.services.employeeService import EmployeeService
from src.schemas.schemas import (
    Employee as EmployeeSchema
)
from src.utils.logger import setup_logger
from src.utils.dependencies import valid_auth_token
# from src.middleware.logging import APIRoute
import requests
from uuid import UUID

router = APIRouter(
    prefix="/employee", 
    tags=["employees"],
    responses={404: {"description": "Not found"}},
    dependencies=[
         Depends(valid_auth_token)
    ]
)
logger = setup_logger() 

@router.post("/add", response_model=EmployeeSchema)
async def add_employee_endpoint(employee: EmployeeSchema):
    logger.info(f"Received request to create employee: {employee.employeeId}")
    employee_service = EmployeeService()
    try:
        db_employee = employee_service.add_new_employee(employee)
        logger.info(f"Employee created successfully: {db_employee.employeeId}")
        return db_employee
    except Exception as e:
        logger.error(f"Error creating employee: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/update/{employee_id}", response_model=EmployeeSchema)
async def update_employee_endpoint(employee_id: UUID, employee: EmployeeSchema):
    logger.info(f"Received request to create employee: {employee.employeeId}")
    employee_service = EmployeeService()
    try:
        db_employee = employee_service.update_employee(employee_id, employee)
        logger.info(f"Employee created successfully: {db_employee.employeeId}")
        return db_employee
    except Exception as e:
        logger.error(f"Error creating employee: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/get/{employee_id}", response_model=EmployeeSchema)
async def get_employee_endpoint(employee_id: UUID, employee_service: EmployeeService = Depends()):
    try:
        return employee_service.get_employee(employee_id)
    except HTTPException as e:
        raise e
    
@router.get("/get-all-employees", response_model=list[EmployeeSchema])
async def get_all_employees_endpoint(employee_service: EmployeeService = Depends()):
    try:
        return employee_service.get_all_employees()
    except HTTPException as e:
        raise e

@router.delete("/delete/{employee_id}")
async def delete_employee_endpoint(employee_id: UUID, employee_service: EmployeeService = Depends())  -> JSONResponse:
    try:
        result = employee_service.delete_employee(employee_id)
        return JSONResponse({"status": result}) 
    except HTTPException as e:
        raise e