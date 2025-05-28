import { Outlet } from "react-router-dom";
import "./App.css";
import { useAuth } from "./auth/AuthProvider";
import { Button } from "./components/ui/button";

function App() {
  const { logout } = useAuth();

  return (
    <>
      <header>
        <Button onClick={logout}>Logout</Button>
      </header>
      <Outlet />
    </>
  );
}

export default App;
