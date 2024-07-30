import { Router } from "express";
import { emailTaken, loginUser, registerUser } from "../logic/user.logic";

const usersRouter = Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/emailTaken", emailTaken);
usersRouter.post("/login", loginUser);

export default usersRouter;
