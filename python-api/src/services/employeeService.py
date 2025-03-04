from src.repositories.employeeRepository import EmployeeRepository
from src.schemas.schemas import Employee as EmployeeSchema
from src.models.models import Employee
from src.utils.logger import setup_logger
from uuid import UUID
from fastapi import HTTPException  # Import HTTPException

logger = setup_logger()

class EmployeeService:
    def __init__(self):
        self.employee_repository = EmployeeRepository()

    # ====================== Database Call ==================================
    def add_new_employee(self, employee: EmployeeSchema) -> EmployeeSchema:
        try:
            logger.info(f"Creating new employee: {employee.employeeId}")
            db_employee = self.employee_repository.create_employee(employee)
            return db_employee
        except Exception as e:
            logger.error(f"Error in EmployeeService.add_new_employee: {e}")
            raise Exception(f"Error in EmployeeService.add_new_employee: {e}")
        
    def get_employee(self, employee_id: UUID) -> EmployeeSchema:
        try:
            logger.info(f"Getting employee with employee_id: {employee_id}")
            db_employee = self.employee_repository.get_employee(employee_id)
            
            if not db_employee:
                logger.warning(f"Employee with employee_id {employee_id} not found")
                raise HTTPException(status_code=404, detail="Employee not found")
            
            return db_employee
        except HTTPException as e:
            # If the repository raises an HTTPException, pass it along
            raise e
        except Exception as e:
            logger.error(f"Error in EmployeeService.get_employee: {e}")
            raise Exception(f"Error in EmployeeService.get_employee: {e}")
        
    def get_all_employees(self) -> list[EmployeeSchema]:
        try:
            logger.info(f"Getting All employees")
            db_employee = self.employee_repository.get_all_employees()
            if not db_employee:
                logger.warning(f"No employees found")
                raise HTTPException(status_code=404, detail="employees not found")
            return db_employee
        except HTTPException as e:
            raise e

    def update_employee(self, employee_id: UUID, employee: EmployeeSchema) -> EmployeeSchema:
        try:
            logger.info(f"Updating employee with employee_id: {employee_id}")
            db_employee = self.employee_repository.update_employee(employee_id, employee)
            return db_employee
        except Exception as e:
            logger.error(f"Error in EmployeeService.update_employee: {e}")
            raise Exception(f"Error in EmployeeService.update_employee: {e}")
        
    def delete_employee(self, employee_id: UUID) -> bool:
        try:
            logger.info(f"Deleting employee with employee_id: {employee_id}")
            db_employee = self.employee_repository.delete_employee(employee_id)
            return db_employee
        except Exception as e:
            logger.error(f"Error in EmployeeService.update_employee: {e}")
            raise Exception(f"Error in EmployeeService.update_employee: {e}")
    # ====================== Database Call ==================================
    
    # ====================== Schema Transform ==================================

    def transform_employee_model_to_schema(
        self, employee: Employee
    ) -> EmployeeSchema:
        return EmployeeSchema(**employee.__dict__)

    # ====================== Schema Transform ==================================