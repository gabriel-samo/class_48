import { useJwt } from "react-jwt";
import { useAppSelector } from "../../store/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { UserToken } from "../../Components/layout/Header/Header";

export default function PrivateRoutes() {
  const user = useAppSelector((state) => state.user.loggedUser);
  const tokenDetails = useJwt<UserToken>(user?.userToken!);
  // console.log(user);
  // console.log(tokenDetails);
  return !tokenDetails || tokenDetails?.isExpired ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
}
