import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
      ? <>
        <Header />
        <main style={{minHeight:'81vh'}}>
          <Outlet />
        </main>
        <Footer />
      </>
      : auth?.accessToken
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;