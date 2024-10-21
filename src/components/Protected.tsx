import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (authStatus === undefined) {
      return;
    }

    if (authStatus && !authentication) {
      navigate("/");
    } else if (!authStatus && authentication) {
      navigate("/login");
    }
  }, [authStatus, navigate, authentication]);

  if (authStatus === undefined) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
