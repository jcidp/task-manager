import { useAuth } from "@/auth/AuthProvider";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full flex justify-between px-4 pt-2">
      <p>Taskmaster</p>
      <div className="grid grid-cols-2">
        <ModeToggle />
        {isAuthenticated && <Button onClick={logout}>Logout</Button>}
      </div>
    </header>
  );
};

export default Header;
