import cors from "cors";
import express from "express";
import { config } from "./config";
import imagesRouter from "./routes/images.route";
import usersRouter from "./routes/users.route";
import vacationsRouter from "./routes/vacations.route";
import followsRouter from "./routes/follows.route";
import moment from "moment";

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ exposedHeaders: "Authorization" }));

// Routes
app.use("/api/images", imagesRouter);
app.use("/api/users", usersRouter);
app.use("/api/vacations", vacationsRouter);
app.use("/api/follows", followsRouter);

// Start server
app.listen(config.app.port, () => {
  console.log(
    `Server is running on http://${config.app.host}:${config.app.port}`
  );
});
