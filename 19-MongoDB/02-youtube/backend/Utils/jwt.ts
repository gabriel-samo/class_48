import { UserCred } from "../Models/UserCred";
import jwt from "jsonwebtoken";
import config from "./config";

//jwt => header,body,signature (secret key)
const createJWT = (user: UserCred) => {
  const payload = {
    id: user.userEmail,
    name: user.userName,
    role: user.userRole
  };
  //for how long the token will be alive
  const options = { expiresIn: config.jwtExpire };
  const myJWT = jwt.sign(payload, config.jwtSecret, options);
  return "Bearer " + myJWT;
};

const checkJWT = (token: string) => {
  try {
    const checkToken = token.split(" ")[1];
    const decoded = jwt.verify(checkToken, config.jwtSecret);
    return createJWT(new UserCred(0, decoded.name, decoded.role, decoded.id));
  } catch (err: any) {
    console.log("error: ", err.name);
    return "";
  }
};

export { createJWT, checkJWT };
