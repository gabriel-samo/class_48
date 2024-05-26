import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import {
  getBike,
  getCar,
  getHandicap,
  getOffRoad,
  getRecall,
  getTruck,
} from "../Logic/vehicleLogic";
import { checkJWT } from "../Utils/jwt";

const vehiclesRouter = Router();

// http://localhost:8080/vehicles/car/:id
vehiclesRouter.get(
  "/car/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const jwt = checkJWT(req.header("Authorization") || "");
    if (jwt.length > 10) {
      const id = req.params.id;
      const carData = await getCar(id);
      res
        .status(200)
        .header("Access-Control-Expose-Headers", "Authorization")
        .header("Authorization", jwt)
        .json(carData);
    } else {
      res.status(401).json({ msg: "Not authorized! please login..." });
    }
  }
);

// http://localhost:8080/vehicles/bike/:id
vehiclesRouter.get(
  "/bike/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const jwt = checkJWT(req.header("Authorization") || "");
    if (jwt.length > 10) {
      const id = req.params.id;
      const carData = await getBike(id);
      res.status(200).json(carData);
    } else {
      res.status(401).json({ msg: "Not authorized! please login..." });
    }
  }
);

// http://localhost:8080/vehicles/truck/:id
vehiclesRouter.get(
  "/truck/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const jwt = checkJWT(req.header("Authorization") || "");
    if (jwt.length > 10) {
      const id = req.params.id;
      const carData = await getTruck(id);
      res.status(200).json(carData);
    } else {
      res.status(401).json({ msg: "Not authorized! please login..." });
    }
  }
);

// http://localhost:8080/vehicles/handicap/:id
vehiclesRouter.get(
  "/handicap/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const jwt = checkJWT(req.header("Authorization") || "");
    if (jwt.length > 10) {
      const id = req.params.id;
      const carData = await getHandicap(id);
      res.status(200).json(carData);
    } else {
      res.status(401).json({ msg: "Not authorized! please login..." });
    }
  }
);

// http://localhost:8080/vehicles/offRoad/:id
vehiclesRouter.get(
  "/offRoad/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const jwt = checkJWT(req.header("Authorization") || "");
    if (jwt.length > 10) {
      const id = req.params.id;
      const carData = await getOffRoad(id);
      res.status(200).json(carData);
    } else {
      res.status(401).json({ msg: "Not authorized! please login..." });
    }
  }
);

// http://localhost:8080/vehicles/recall/:id
vehiclesRouter.get(
  "/recall/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const jwt = checkJWT(req.header("Authorization") || "");
    if (jwt.length > 10) {
      const id = req.params.id;
      const carData = await getRecall(id);
      res.status(200).json(carData);
    } else {
      res.status(401).json({ msg: "Not authorized! please login..." });
    }
  }
);

export default vehiclesRouter;
