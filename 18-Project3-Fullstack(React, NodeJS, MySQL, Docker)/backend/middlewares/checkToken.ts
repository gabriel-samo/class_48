import jwt from "jsonwebtoken";
import { config } from "../config";
import { Request, Response, NextFunction } from "express";

// Declare global namespace for Express to understand the currentUser property
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

// Middleware to check if the token is valid
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the token from the authorization header
    const token = req.headers.authorization?.split(" ")[1];
    // Verify the token and decode it
    const decoded = jwt.verify(
      token!,
      config.jwt.secret!
    ) as Request["currentUser"];
    // Assign the decoded token to the currentUser property of the request
    req.currentUser = decoded;
    // Call the next middleware
    next();
  } catch (error: any) {
    // If the token is invalid, return an error message
    next(res.json(error.message));
  }
};
