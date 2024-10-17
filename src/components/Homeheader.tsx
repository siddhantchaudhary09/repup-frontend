import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button.tsx";

const Header = () => {
  const [isSignedIn, setIsSignedIn] = useState(true); // State to track sign-in status

  const handleLogOut = () => {
    setIsSignedIn(false);
  };

  return (
    <div className="fixed top-0 text-white left-0 right-0 bg-zinc-900 shadow-lg">
      <div className="flex justify-between items-center p-3">
        <Link to="/" className="text-2xl font-bold">
          RepUp
        </Link>
        <div className="space-x-3">
          {isSignedIn && (
            <Button
              variant="ghost"
              className="bg-zinc-700"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
