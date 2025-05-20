import { Login, Signup, User } from "@/types";
import { Loader2Icon } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import authApi from "./authApi";

interface AuthContextType {
  user: User | null;
  token: string | null;
  signup: Signup;
  login: Login;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("auth_token");
  });

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken) {
        try {
          const me = await authApi.getCurrentUser(storedToken);
          setUser(me);
          setToken(token);
        } catch (error) {
          localStorage.removeItem("auth_token");
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const signup = async (signupParams: Parameters<Signup>[0]) => {
    const data = await authApi.signup(signupParams);
    localStorage.setItem("auth_token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const login = async (loginParams: Parameters<Login>[0]) => {
    const data = await authApi.login(loginParams);
    localStorage.setItem("auth_token", data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = async () => {
    if (token) await authApi.logout(token);
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
  };

  if (loading)
    return (
      <div className="w-screen h-screen grid place-content-center">
        <Loader2Icon className="w-20 h-20 animate-spin" />
      </div>
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
