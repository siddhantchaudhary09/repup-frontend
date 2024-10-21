import { Dumbbell, House, UserRound } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 shadow-lg">
      <div className="flex justify-around p-4">
        <Link to="/" className="flex flex-col items-center text-white">
          <i className="fas fa-home text-2xl"></i>
          <span className="text-xs">
            <House />
          </span>
        </Link>
        <Link to="/workout" className="flex flex-col items-center text-white">
          <i className="fas fa-dumbbell text-2xl"></i>
          <span className="text-xs">
            <Dumbbell />
          </span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-white">
          <i className="fas fa-user text-2xl"></i>
          <span className="text-xs">
            <UserRound />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
