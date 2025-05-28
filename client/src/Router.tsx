import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import AuthProvider from "./auth/AuthProvider";
import ErrorPage from "./pages/ErrorPage";
import Signup from "./pages/Signup";
import Summary from "./pages/Summary";

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<App />}>
              <Route index element={<Summary />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
