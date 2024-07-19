import { UserCred } from "../Models/UserCred";
import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");

type JwtPayload = {
  id: string;
  name: string;
  role: string;
};

const secretKey = process.env.JWT_SECRET;

const createJWT = (user: UserCred) => {
  const payload = {
    id: user.userEmail,
    name: user.userName,
    role: user.userRole,
  };
  const options = { expiresIn: process.env.JWT_EXPIRES };
  const jwtToken = jwt.sign(
    payload,
    // secretKey as string,
    secretKey!,
    options
  );
  return `Bearer ${jwtToken}`;
};

const checkJWT = (token: string) => {
  try {
    const checkToken = token.split(" ")[1];
    const verifiedToken = jwt.verify(checkToken, secretKey!) as JwtPayload;
    const { name, role, id } = verifiedToken;
    return createJWT(new UserCred(name, role, id));
  } catch (error: any) {
    console.log(error);
    return "";
  }
};

export { createJWT, checkJWT };
