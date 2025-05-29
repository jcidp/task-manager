import { Outlet } from "react-router-dom";
import "./App.css";
import { useAuth } from "./auth/AuthProvider";
import { Button } from "./components/ui/button";

function App() {
  const { logout } = useAuth();

  return (
    <>
      <header className="w-full flex justify-between px-4 pt-2">
        <p>Taskmaster</p>
        <Button onClick={logout}>Logout</Button>
      </header>
      <Outlet />
    </>
  );
}

export default App;
