import { Navigate, Outlet, useLocation } from "react-router";
import { useUserDetails } from "../context/userContext";

const RequireAuth = () => {
  const { user } = useUserDetails();
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
