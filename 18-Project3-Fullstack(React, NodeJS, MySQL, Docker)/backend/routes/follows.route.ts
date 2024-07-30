import { Router } from "express";
import { checkToken } from "../middlewares/checkToken";
import { addFollow, getFollows } from "../logic/follows.logic";

const followsRouter = Router();

followsRouter.get("/:vacationId", checkToken, getFollows);
followsRouter.post("/add", checkToken, addFollow);

export default followsRouter;
