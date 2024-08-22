import express from "express";
import { addAccountAction, getAccountActions } from "../logic/account.logic";

const accountRouter = express.Router();

accountRouter.get("/actions/:accountNumber", getAccountActions);
accountRouter.post("/add-action", addAccountAction);

export default accountRouter;
