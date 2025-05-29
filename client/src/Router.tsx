import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import AuthProvider from "./auth/AuthProvider";
import ErrorPage from "./pages/ErrorPage";
import Signup from "./pages/Signup";
import Summary from "./pages/Summary";
import { ThemeProvider } from "./components/ThemeProvider";

const Router = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route element={<App />}>
              <Route element={<ProtectedRoutes />}>
                <Route index element={<Summary />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Router;
