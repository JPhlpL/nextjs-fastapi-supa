import axios, { AxiosError } from "axios";
import { ApiError } from "@/types";

const X_AUTH_KEY = process.env.NEXT_PUBLIC_API_KEY;

type Params = {
  [key: string]: string | number | boolean | undefined;
};

export const postData = async <T>({
  url,
  data,
  refreshCredits,
}: {
  url: string;
  data?: T; // Use a generic type here
  refreshCredits?: () => Promise<void>;
}) => {
  try {
    const response = await axios.post<T>(url, data, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": X_AUTH_KEY,
      },
      withCredentials: false,
    });

    if (refreshCredits) {
      await refreshCredits();
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data.detail || "An error occurred");
    }
    throw error;
  }
};

export const getData = async <T>({
  url,
  params = {},
  refreshCredits = async () => {},
}: {
  url: string;
  params?: Params;
  refreshCredits?: () => Promise<void>;
}): Promise<T> => {
  try {
    const response = await axios.get<T>(url, {
      headers: {
        'x-auth-token': X_AUTH_KEY,
      },
      params,
      withCredentials: false,
    });

    if (refreshCredits) {
      await refreshCredits();
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    if (axiosError.response) {
      console.error('Error fetching data:', axiosError.response.data);
      throw new Error(axiosError.response.data.detail || 'An error occurred');
    }
    console.error('Unexpected error:', error);
    throw error;
  }
};

export const deleteData = async ({
  url,
  refreshCredits,
}: {
  url: string;
  refreshCredits?: () => Promise<void>;
}): Promise<void> => {
  try {
    const response = await axios.delete(url, {
      headers: {
        'x-auth-token': X_AUTH_KEY,
      },
      withCredentials: false,
    });

    if (refreshCredits) {
      await refreshCredits();
    }

    return response.data; // If you want to return some data, otherwise you can just return void
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    if (axiosError.response) {
      console.error('Error deleting data:', axiosError.response.data);
      throw new Error(axiosError.response.data.detail || 'An error occurred');
    }
    console.error('Unexpected error:', error);
    throw error;
  }
};

export const putData = async <T>({
  url,
  data,
  refreshCredits,
}: {
  url: string;
  data: T; // Use the generic type here
  refreshCredits?: () => Promise<void>;
}): Promise<T> => { // Change return type to Promise<T>
  try {
    const response = await axios.put<T>(url, data, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": X_AUTH_KEY,
      },
      withCredentials: false,
    });

    if (refreshCredits) {
      await refreshCredits();
    }

    return response.data; // Return the response data
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    if (axiosError.response) {
      console.error('Error updating data:', axiosError.response.data);
      throw new Error(axiosError.response.data.detail || 'An error occurred');
    }
    console.error('Unexpected error:', error);
    throw error;
  }
};