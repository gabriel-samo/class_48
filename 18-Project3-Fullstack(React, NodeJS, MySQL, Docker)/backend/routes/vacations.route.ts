import { Router } from "express";
import { checkToken } from "../middlewares/checkToken";
import {
  getAllVacations,
  getFollowedVacations,
  getNotStartedVacations,
  getActiveVacations
} from "../logic/vacation.logic";

const vacationsRouter = Router();

vacationsRouter.get("/all", checkToken, getAllVacations);
vacationsRouter.get("/followed", checkToken, getFollowedVacations);
vacationsRouter.get("/not-started", checkToken, getNotStartedVacations);
vacationsRouter.get("/active", checkToken, getActiveVacations);

export default vacationsRouter;
