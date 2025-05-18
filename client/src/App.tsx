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
      <h1 className="text-purple-800">Hello, world!</h1>
    </>
  );
}

export default App;
