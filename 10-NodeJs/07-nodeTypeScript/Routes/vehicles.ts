//getting the methods we need
import express, { NextFunction, Request, Response } from "express";
import {
  bikeInfo,
  carBoomInfo,
  carInfo,
  truckInfo,
} from "../logic/TransportLogic";

const carRouter = express.Router();

carRouter.get(
  "/car/:id",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    response.status(201).json(await carInfo(request.params.id));
  }
);

carRouter.get(
  "/bike/:id",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    response.status(200).json(await bikeInfo(request.params.id));
  }
);

carRouter.get(
  "/truck/:id",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    response.status(200).json(await truckInfo(request.params.id));
  }
);

carRouter.get(
  "/carBoom/:id",
  async (request: Request, response: Response, nextFunction: NextFunction) => {
    response.status(200).json(await carBoomInfo(request.params.id));
  }
);
export default carRouter;
