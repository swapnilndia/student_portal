import { Navigate, Outlet } from "react-router";
import { useUserDetails } from "../context/userContext";

const RedirectIfAuthenticated = () => {
  const { user } = useUserDetails();
  return user ? <Navigate to="/" replace /> : <Outlet />;
};
export default RedirectIfAuthenticated;
