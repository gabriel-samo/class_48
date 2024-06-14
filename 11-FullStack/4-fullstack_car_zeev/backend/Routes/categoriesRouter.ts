import express, { NextFunction, Request, Response } from "express";
import categoriesLogic from "../logic/CategoryLogic";
const categoriesRouter = express.Router();

categoriesRouter.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      //L O G I C !
      const categories = await categoriesLogic.getAllCategories();
      //return the response from mysql database as json format
      response.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }
);

export default categoriesRouter;
