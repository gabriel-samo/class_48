import { Router } from "express";
import { checkToken } from "../middlewares/checkToken";
import { addFollow, getFollows } from "../logic/follows.logic";

const followsRouter = Router();

// Get followers of a specific vacation
followsRouter.get("/:vacationId", checkToken, getFollows);
// Add a follow to a specific vacation
followsRouter.post("/add", checkToken, addFollow);

export default followsRouter;
