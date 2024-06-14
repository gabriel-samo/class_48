import express, { NextFunction, Request, Response } from "express";
import ordersLogic from "../logic/OrderLogic";
const ordersRouter = express.Router();

ordersRouter.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      //L O G I C !
      const orders = await ordersLogic.getAllOrders();
      //return the response from mysql database as json format
      response.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }
);

export default ordersRouter;
