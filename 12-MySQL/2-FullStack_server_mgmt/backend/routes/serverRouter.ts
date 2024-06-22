import express from "express";
import { allServers, setServerStatus } from "../logic/serverLogic";

const serverRouter = express.Router();

// http://localhost:8080/api/servers/all
serverRouter.get("/all", allServers);
// http://localhost:8080/api/servers/:id/status
serverRouter.post("/:id/status", setServerStatus);

export default serverRouter;
