from sqlalchemy.orm import Session
from src.models.models import Employee
from src.wrappers.dbSessionWrapper import with_db_session
from sqlalchemy import select
from src.utils.logger import setup_logger
from uuid import UUID
import bcrypt
from datetime import datetime, timezone
logger = setup_logger()


class EmployeeRepository:
    
    @with_db_session
    def get_employee(self, employee_id: UUID, scoped_db: Session) -> Employee:
        try:
            logger.info(f"Fetching employee with ID: {employee_id}")
            db_employee = scoped_db.query(Employee).filter(Employee.employeeId == str(employee_id)).first()

            if not db_employee:
              return None
          
            logger.info(f"Employee with ID: {employee_id} found.")
            return db_employee
        
        except Exception as e:
            logger.error(f"Error getting employee with ID {employee_id}: {e}")
            raise Exception(f"Error in EmployeeRepository.get_employee: {e}")
        
    @with_db_session
    def get_all_employees(self, scoped_db: Session) -> list[Employee]:
        try:
            logger.info(f"Fetching all employees")
            db_employee = scoped_db.query(Employee).all()

            if not db_employee:
              return None
          
            logger.info(f"No employees found")
            return db_employee
        
        except Exception as e:
            logger.error(f"Error getting employee all employees: {e}")
            raise Exception(f"Error in EmployeeRepository.get_all_employees: {e}")
        
    @with_db_session
    def create_employee(self, employee: Employee, scoped_db: Session) -> Employee:
        try:
            logger.info(f"Creating employee: {employee.employeeId}")
            
            db_employee = Employee(
                employeeId=employee.employeeId,
                firstName=employee.firstName,
                lastName=employee.lastName,
                department=employee.department,
                section=employee.section,
                position=employee.position,
                jobLevel=employee.jobLevel,
                serviceYears=employee.serviceYears,
                dateHired=employee.dateHired
            )
            scoped_db.add(db_employee)
            scoped_db.commit()
            scoped_db.refresh(db_employee)
            logger.info(f"Employee created successfully: {db_employee.employeeId}")
            return db_employee
        except Exception as e:
            logger.error(f"Error creating employee: {e}")
            raise Exception(f"Error in EmployeeRepository.create_employee: {e}")
        
    @with_db_session
    def update_employee(self, employee_id: UUID, employee: Employee, scoped_db: Session ) -> Employee:
        try:
            logger.info(f"Updating employee with ID: {employee_id}")
            db_employee = scoped_db.query(Employee).filter(Employee.employeeId == str(employee_id)).first()

            if db_employee:
                if employee.employeeId:
                    db_employee.employeeId = employee.employeeId
                if employee.firstName:
                    db_employee.firstName = employee.firstName
                if employee.lastName:
                    db_employee.lastName = employee.lastName
                if employee.department:
                    db_employee.department = employee.department
                if employee.section:
                    db_employee.section = employee.section
                if employee.position:
                    db_employee.position = employee.position
                if employee.jobLevel:
                    db_employee.jobLevel = employee.jobLevel
                if employee.serviceYears:
                    db_employee.serviceYears = employee.serviceYears
                if employee.dateHired:
                    db_employee.dateHired = employee.dateHired
                    
                db_employee.updatedAt = datetime.now(timezone.utc)

                scoped_db.commit()
                scoped_db.refresh(db_employee)
                return db_employee
            else:
                raise Exception("Employee not found")
        except Exception as e:
            logger.error(f"Error updating employee in repository: {e}")
            scoped_db.rollback()
            raise Exception(f"Error in EmployeeRepository.update_employee: {e}")
        
    @with_db_session
    def delete_employee(self, employee_id: UUID, scoped_db: Session) -> bool:
        try:
            logger.info(f"Deleting employee with ID: {employee_id}")
            
            query = (
               scoped_db.query(Employee).filter(Employee.employeeId == str(employee_id)).first()
            )
            if query:
                scoped_db.delete(query)
                scoped_db.commit()
                logger.info(f"Deleted employee with ID: {employee_id}")
                return True
            
            logger.info(f"No employee with ID: {employee_id} found")
            return False
            
        except Exception as e:
            logger.error(f"Error deleting employee with ID {employee_id}: {e}")
            raise Exception(f"Error in EmployeeRepository.delete_employee: {e}")