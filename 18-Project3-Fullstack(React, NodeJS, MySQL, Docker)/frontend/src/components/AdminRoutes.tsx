import { decodeToken } from "react-jwt";
import { useAppSelector } from "../redux/hooks";
import { Outlet, Navigate } from "react-router-dom";

function AdminRoutes() {
  const currentUser = useAppSelector((state) => state.currentUser);

  if (!currentUser.token) return <Navigate to="/login" />;

  const isAdmin = decodeToken<{ isAdmin: boolean }>(
    currentUser.token.split(" ")[1]
  )?.isAdmin;

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoutes;
