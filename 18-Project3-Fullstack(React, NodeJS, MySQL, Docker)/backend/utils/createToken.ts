import jwt from "jsonwebtoken";

export const createToken = (id: number, isAdmin: boolean) => {
  return `Bearer ${jwt.sign({ id, isAdmin }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES!
  })}`;
};
