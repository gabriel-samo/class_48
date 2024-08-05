import { Router } from "express";
import { checkToken } from "../middlewares/checkToken";
import {
  getAllVacations,
  getFollowedVacations,
  getNotStartedVacations,
  getActiveVacations,
  addVacation,
  updateVacation,
  getVacationById,
  deleteVacation
} from "../logic/vacation.logic";

const vacationsRouter = Router();

vacationsRouter.get("/one/:id", checkToken, getVacationById);
vacationsRouter.get("/all", checkToken, getAllVacations);
vacationsRouter.get("/followed", checkToken, getFollowedVacations);
vacationsRouter.get("/not-started", checkToken, getNotStartedVacations);
vacationsRouter.get("/active", checkToken, getActiveVacations);

vacationsRouter.post("/new", checkToken, addVacation);
vacationsRouter.post("/update/:id", checkToken, updateVacation);

vacationsRouter.delete("/delete/:id", checkToken, deleteVacation);

export default vacationsRouter;
