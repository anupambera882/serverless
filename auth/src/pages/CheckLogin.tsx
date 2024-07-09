import { useLocation, Navigate, Outlet } from "react-router-dom";
import useIsLoginState from "../hooks/useIsLoginState";
const CheckLogin = () => {
  const { isLogin } = useIsLoginState();
  const location = useLocation();

  return (
    <>
      {isLogin
        ? <Navigate to="/todo" state={{ from: location }} replace />
        : <Outlet />
      }
    </>
  );
}

export default CheckLogin;
