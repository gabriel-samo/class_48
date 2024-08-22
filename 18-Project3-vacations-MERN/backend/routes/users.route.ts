import { Router } from "express";
import { emailTaken, loginUser, registerUser } from "../logic/user.logic";

const usersRouter = Router();

// Register user
usersRouter.post("/register", registerUser);
// Check if email is taken
usersRouter.post("/emailTaken", emailTaken);
// Login user
usersRouter.post("/login", loginUser);

export default usersRouter;
