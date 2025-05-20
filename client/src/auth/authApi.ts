import { LoginParams, SignupParams, User } from "@/types";
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
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    if (!(response.headers instanceof AxiosHeaders))
      throw Error("Invalid headers");
    const token = response.headers.get("X-Session-Token") as string;
    const user = response.data as User;
    return { user, token };
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

  signup: async ({ email, password, confirmation }: SignupParams) => {
    const response = await axiosInstance.post("/signup", {
      email,
      password,
      password_confirmation: confirmation,
    });
    if (!(response.headers instanceof AxiosHeaders)) {
      throw Error("Invalid headers");
    }
    const token = response.headers.get("X-Session-Token") as string;
    const user = response.data as User;
    return { user, token };
  },

  getCurrentUser: async (token: string) => {
    const response = await axiosInstance.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default authApi;
