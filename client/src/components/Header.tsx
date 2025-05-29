import { useAuth } from "@/auth/AuthProvider";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full flex justify-between px-4 pt-2">
      <p className="font-bold">Taskmaster</p>
      <div className="grid grid-cols-[max-content_max-content] gap-x-4">
        <ModeToggle />
        {isAuthenticated && <Button onClick={logout}>Logout</Button>}
      </div>
    </header>
  );
};

export default Header;
