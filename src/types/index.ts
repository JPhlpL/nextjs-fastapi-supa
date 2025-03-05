export interface ApiError {
    detail?: string;
    user_message?: string;
  }
  export interface User {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string; // Ensure this is spelled correctly
  }

  export interface UserLite {
    email: string;
  }

  export interface UserRegistration {
    email: string;
    password: string;
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
  }


  // Add other types as needed