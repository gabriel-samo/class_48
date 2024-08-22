import { isExpired } from "react-jwt";
import { Outlet, Navigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

function PrivateRoute() {
  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();

  if (!currentUser.token) {
    return <Navigate to="/login" />;
  }

  const tokenIsVaild = isExpired(currentUser.token.split(" ")[1]);
  if (tokenIsVaild) {
    dispatch(logoutUser());
    return <Navigate to="/login" />;
  }

  return currentUser.token && !tokenIsVaild ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
