//getting the methods we need
import express, { NextFunction, Request, Response } from "express";
import { addCar } from "../Logic/carLogic";

const carRouter = express.Router();

// http://localhost:8080/api/car

carRouter.post(
  "/add/:id",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    response
      .status(201)
      .json(
        await addCar(
          request.body.id,
          request.body.km,
          request.body.yad,
          request.body.price
        )
      );
  }
);

export default carRouter;
