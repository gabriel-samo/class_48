import { store } from "../redux/store";
//npm install react-jwt
//https://www.npmjs.com/package/react-jwt
import { isExpired, decodeToken } from "react-jwt";
import { loginAction } from "../redux/AuthRedicer";
import notify from "./Notify";

export const checkJWT = () => {
  let jwt = "";
  //check if we have jwt in sessionStorage
  jwt = sessionStorage.getItem("jwt")?.split(" ")[1] || "";
  if (jwt.length < 10) {
    //if not check if we have it on localStorage
    jwt = localStorage.getItem("jwt")?.split(" ")[1] || "";
  }
  //getting our token without bearer

  if (jwt.length < 10) {
    notify.error("JWT is not valid!");
    return false;
  }

  if (isExpired(jwt)) {
    notify.error("JWT is expired!");
    return false;
  }

  let myDecoded: any = decodeToken(jwt);
  myDecoded.jwt = "Bearer " + jwt;
  store.dispatch(loginAction(myDecoded));

  return true;
};
