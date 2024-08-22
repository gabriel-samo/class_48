import express from "express";

import { getCars } from "../logic/cars.logic";

// Initialize cars router
const carsRouter = express.Router();

// Routes
carsRouter.get("/", getCars);

// Export cars router
export default carsRouter;
