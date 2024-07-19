import express, { NextFunction, Request, Response } from "express";
import { forgotPassword, loginUser, registerUser } from "../logic/userLogic";

const loginRouter = express.Router();

loginRouter.post(
  "/loginUser",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    let userCred = request.body;
    /*
      {
        userName : "gabriel",
        userPass : "123456"
      }
    */
    if (loginUser(userCred)) {
      response.status(200).json({ msg: `hello ${userCred.userName}` });
    } else {
      response.status(200).json({ msg: `Username or password does not match` });
    }
  }
);

loginRouter.post(
  "/registerUser",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    if (registerUser(request.body)) {
      response.status(201).json({ msg: "user was created" });
    } else {
      response.status(400).json({ msg: "user already exists" });
    }
  }
);

loginRouter.post(
  "/forgotPassword",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    if (forgotPassword(request.body.userName)) {
      response
        .status(200)
        .json({ userPass: forgotPassword(request.body.userName) });
    } else {
      response.status(400).json({ msg: "user does not exists" });
    }
  }
);

export default loginRouter;
