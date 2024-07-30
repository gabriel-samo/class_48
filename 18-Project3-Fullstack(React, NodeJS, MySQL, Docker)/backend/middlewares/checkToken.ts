import jwt from "jsonwebtoken";
import { config } from "../config";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    export interface Request {
      currentUser?: {
        id: number;
        iat: number;
        exp: number;
        isAdmin: boolean;
      };
    }
  }
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(
      token!,
      config.jwt.secret!
    ) as Request["currentUser"];
    req.currentUser = decoded;
    next();
  } catch (error: any) {
    next(res.json(error.message));
  }
};
