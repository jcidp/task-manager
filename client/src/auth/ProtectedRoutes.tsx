import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return <Outlet />;
};

export default ProtectedRoutes;
