import { useAuth } from "@/auth/AuthProvider";
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const API_BASE_URL = "/api";

const useApi = () => {
  const { token, logout } = useAuth();

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle 401 Unauthorized (expired or invalid token)
      if (error.response?.status === 401) {
        logout();
        return Promise.reject(
          new Error("Your session has expired. Please log in again."),
        );
      }

      // Format error message from server or use default message
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "An unknown error occurred";
      return Promise.reject(new Error(errorMessage));
    },
  );

  return {
    get: <T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
      axiosInstance.get<T>(endpoint, config).then((response) => response.data),

    post: <T = any>(
      endpoint: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T> =>
      axiosInstance
        .post<T>(endpoint, data, config)
        .then((response) => response.data),

    put: <T = any>(
      endpoint: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T> =>
      axiosInstance
        .put<T>(endpoint, data, config)
        .then((response) => response.data),

    patch: <T = any>(
      endpoint: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T> =>
      axiosInstance
        .patch<T>(endpoint, data, config)
        .then((response) => response.data),

    delete: <T = any>(
      endpoint: string,
      config?: AxiosRequestConfig,
    ): Promise<T> =>
      axiosInstance
        .delete<T>(endpoint, config)
        .then((response) => response.data),

    getInstance: () => axiosInstance,
  };
};

export default useApi;
