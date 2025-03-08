export interface ApiError {
    detail?: string;
    user_message?: string;
  }
  export interface User {
    id: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    role: string;
  }

  export interface UserLite {
    name: string;
    email: string;
  }

  export interface UserRegistration {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  
  export interface UserInfo {
    user_info: UserLite;
  }


  // Add other types as needed