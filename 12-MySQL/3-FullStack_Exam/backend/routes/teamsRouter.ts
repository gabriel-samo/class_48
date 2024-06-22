import express from "express";
import { getAllTeams } from "../logic/teamsLogic";

const teamsRouter = express.Router();

// http://localhost:8080/api/teams
teamsRouter.get("/", getAllTeams);

export default teamsRouter;
