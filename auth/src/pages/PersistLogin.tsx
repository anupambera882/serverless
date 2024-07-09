import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import Spinner from "../components/Spinner";
import useIsLoginState from "../hooks/useIsLoginState";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { isLogin } = useIsLoginState();
  const hasRefreshed = useRef(false); // Add a ref to track refresh state

  useEffect(() => {
    const verifyRefreshToken = async () => {
      if (hasRefreshed.current) return; // Prevent multiple calls
      hasRefreshed.current = true; // Set the flag to true after the first call

      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    verifyRefreshToken();
  }, [refresh]);

  if (isLoading) {
    return <Spinner />;
  }

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PersistLogin;
