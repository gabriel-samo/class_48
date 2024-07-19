import {
  Router,
  type Request,
  type Response,
  type NextFunction
} from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
  updateUser
} from "../Logic/usersLogic";

const usersRouter = Router();

// http://localhost:8123/users/register
usersRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    let { userName, userPass, userEmail, userRole, phoneNumber } = req.body;
    if (!userName || !userPass || !userEmail) {
      return res
        .status(400)
        .json({ msg: "Username, password and email are required -_-'" });
    }
    if (!userRole) {
      userRole = "Guest";
    }
    const newUser = {
      userName,
      userPass,
      userEmail,
      userRole,
      phoneNumber
    };
    const createdUser = await registerUser(newUser);
    if (!createdUser) {
      return res.status(400).json({ msg: "User already exists :(" });
    } else {
      return res
        .status(200)
        .json({ msg: `User ${newUser.userName} was created successfully! :)` });
    }
  }
);

// http://localhost:8123/users/login
usersRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, userPass } = req.body;
    if (userName.length < 2 || userPass.length < 2) {
      return res.status(400).json({ msg: "Username and password required!" });
    }
    const userDetails = await loginUser(userName, userPass);
    const newJwt = userDetails.jwt;
    delete userDetails.jwt;
    if (newJwt!.length > 10) {
      return res
        .status(200)
        .header("Access-Control-Expose-Headers", "Authorization")
        .header("Authorization", newJwt)
        .json({ msg: `${userName} was logged in :)`, userDetails });
    } else {
      return res
        .status(401)
        .json({ msg: "Username or password are incorrect :(" });
    }
  }
);

// http://localhost:8123/users/forgotPassword/:userName
usersRouter.post(
  "/forgotPassword/:userName",
  async (req: Request, res: Response, next: NextFunction) => {
    const { newPassword } = req.body;
    const { userName } = req.params;
    if (!newPassword)
      return res.status(400).json({ msg: "New password is required!" });
    const result = await forgotPassword(userName, newPassword);
    if (!result) return res.status(401).json({ msg: "User does not exits!" });
    else
      return res
        .status(200)
        .json({ msg: `${userName} password was changed :)` });
  }
);

// http://localhost:8123/users/updateUser/:userName
usersRouter.post(
  "/updateUser/:userName",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.params;
    const { newPassword, newEmail, newUserName } = req.body;
    if (!newPassword && !newEmail && !newUserName) {
      return res.status(400).json({ msg: "User is unchanged" });
    }
    const msg = await updateUser(userName, newPassword, newEmail, newUserName);
    if (msg.error) {
      return res.status(400).json({ msg: msg.error });
    } else {
      return res.status(200).json({ msg: msg.success });
    }
  }
);

export default usersRouter;
