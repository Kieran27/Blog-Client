import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const userToken = JSON.parse(localStorage.getItem("token"));
  return userToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
