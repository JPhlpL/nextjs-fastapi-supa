export interface ApiError {
    detail?: string;
    user_message?: string;
  }
  export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string; // Ensure this is spelled correctly
  }

  export interface UserLite {
    email: string;
    username: string;
  }

  export interface UserRegistration {
    email: string;
    username: string;
    password: string;
  }

  export interface Employee {
    id: string;
    employeeId: string;
    firstName: string;
    lastName: string;
    department: string;
    section: string;
    position: string;
    jobLevel: string;
    serviceYears: number;
    dateHired: string;
    createdAt: string;
    updatedAt: string;
  }
  export interface Role {
    id: string;
    title: string;
    user_id: string;
    createdAt: string;
    updatedAt: string; // Ensure this is spelled correctly
  }
  
  export interface UserInfo {
    user_info: UserLite;
    employee_info: Employee
  }


  // Add other types as needed