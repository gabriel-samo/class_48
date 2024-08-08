import jwt from "jsonwebtoken";
import { config } from "./../config/index";

// Create a token for the user
export const createToken = (id: number, isAdmin: boolean) => {
  return `Bearer ${jwt.sign({ id, isAdmin }, config.jwt.secret!, {
    expiresIn: config.jwt.expiresIn!
  })}`;
};
