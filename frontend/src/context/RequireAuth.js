import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  return allowedRoles?.find((role) => localStorage.getItem("role") === role) ? (
    <Outlet />
  ) : localStorage.getItem("loggedIn") ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
