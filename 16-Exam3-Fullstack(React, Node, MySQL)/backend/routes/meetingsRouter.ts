import express from "express";
import { addNewMeeting, getTeamMeetings } from "../logic/meetingsLogic";

const meetingsRouter = express.Router();

// http://localhost:8080/api/meetings/team/:id
meetingsRouter.get("/team/:id", getTeamMeetings);
// http://localhost:8080/api/meetings/new
meetingsRouter.post("/new", addNewMeeting);

export default meetingsRouter;
