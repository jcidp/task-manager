import { LoginParams, User } from "@/types";
import axios, { AxiosHeaders } from "axios";

const API_BASE_URL = "/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authApi = {
  login: async ({ email, password }: LoginParams) => {
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      if (!(response.headers instanceof AxiosHeaders))
        throw Error("Invalid headers");
      const token = response.headers.get("X-Session-Token") as string;
      const user = response.data as User;
      return { user, token };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || error.message || "Login failed",
        );
      }
      throw error;
    }
  },

  logout: async (token: string) => {
    try {
      await axiosInstance.delete("/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || error.message || "Logout failed",
        );
      }
      throw error;
    }
  },

  signup: async (email: string, password: string, confirmation: string) => {
    try {
      const response = await axiosInstance.post("/signup", {
        email,
        password,
        confirmation,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error || error.message || "Signup failed",
        );
      }
      throw error;
    }
  },

  getCurrentUser: async (token: string) => {
    try {
      const response = await axiosInstance.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error ||
            error.message ||
            "Failed to get user information",
        );
      }
      throw error;
    }
  },
};

export default authApi;
