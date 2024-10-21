import { ReactNode, useEffect, useState } from "react";
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
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state: any) => state.auth.status);

  useEffect(() => {
    if (authStatus !== undefined) {
      if (authStatus) {
        if (!authentication) {
          navigate("/");
        }
      } else {
        if (authentication) {
          navigate("/login");
        }
      }
      setLoader(false);
    }
  }, [authStatus, navigate, authentication]);

  if (loader) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}
