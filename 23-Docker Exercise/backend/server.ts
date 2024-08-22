import cors from "cors";
import express from "express";
import carsRouter from "./routes/cars.route";

// Initialize express server
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/cars", carsRouter);

// Start the server
app.listen(8080, () => {
  console.log("Server is running http://localhost:8080");
});
