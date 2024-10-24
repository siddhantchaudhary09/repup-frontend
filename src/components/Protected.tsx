import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
  authentication?: boolean;
}

export default function Protected({
  children,
  authentication = true,
}: ProtectedProps) {
  const authStatus = useSelector((state: any) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if authStatus is defined before navigating
    if (authStatus !== undefined) {
      if (authStatus && !authentication) {
        // If authenticated but trying to access a restricted route
        navigate(location.state?.from || "/");
      } else if (!authStatus && authentication) {
        // If not authenticated and trying to access a protected route
        navigate("/login", { state: { from: location.pathname } });
      }
    }
  }, [authStatus, navigate, authentication, location]);

  // Show a loading state if authStatus is undefined
  if (authStatus === undefined) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
