import { NavLink } from "react-router-dom";
import "./Header.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useState } from "react";
import { logoutUser } from "../../../store/userSlice";
import LogoutPrompt from "../../LogoutPrompt";
import { useJwt } from "react-jwt";

export type UserToken = {
  id: string;
  name: string;
  role: string;
};

function Header(): JSX.Element {
  const [logoutIsVisible, setLogoutIsVisible] = useState(false);
  const loggedUser = useAppSelector((state) => state.user.loggedUser);

  const token = useJwt<UserToken>(loggedUser?.userToken!);
  const { decodedToken } = token;

  let loggedIn =
    loggedUser?.userToken &&
    loggedUser?.userToken.length > 10 &&
    !token.isExpired
      ? true
      : false;

  const dispatch = useAppDispatch();

  function handleOpenLogoutPrompt() {
    setLogoutIsVisible(true);
  }

  function handleCloseLogoutPrompt() {
    setLogoutIsVisible(false);
  }

  function handleLogout(userName: string) {
    dispatch(logoutUser(userName));
    loggedIn = false;
  }
  return (
    <div className="Header">
      {logoutIsVisible && (
        <LogoutPrompt
          onClose={handleCloseLogoutPrompt}
          onLogout={handleLogout}
          userName={decodedToken?.name!}
        />
      )}
      <div className="title">
        <h1 className="text-4xl font-bold">My Car Lot</h1>
      </div>
      {!loggedIn ? (
        <div className="auth">
          <NavLink to="/login" end>
            Login
          </NavLink>
          <NavLink to="/register" end>
            Register
          </NavLink>
        </div>
      ) : (
        <div className="auth">
          <NavLink to={`/userProfile/${decodedToken?.name}`}>
            {decodedToken?.name}
          </NavLink>
          <button
            className="logout bg-yellow-400"
            onClick={handleOpenLogoutPrompt}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
