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
  deleteVacation,
  getReports
} from "../logic/vacation.logic";

const vacationsRouter = Router();

// Get specific vacation by id
vacationsRouter.get("/one/:id", checkToken, getVacationById);
// Get all vacations
vacationsRouter.get("/all", checkToken, getAllVacations);
// Get followed vacations
vacationsRouter.get("/followed", checkToken, getFollowedVacations);
// Get not started vacations
vacationsRouter.get("/not-started", checkToken, getNotStartedVacations);
// Get active vacations
vacationsRouter.get("/active", checkToken, getActiveVacations);
// Get reports
vacationsRouter.get("/reports", checkToken, getReports);
// Add new vacation
vacationsRouter.post("/new", checkToken, addVacation);
// Update vacation
vacationsRouter.post("/update/:id", checkToken, updateVacation);
// Delete vacation
vacationsRouter.delete("/delete/:id", checkToken, deleteVacation);

export default vacationsRouter;
