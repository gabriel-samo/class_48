import cors from "cors";
import express from "express";
import { config } from "./config/index";
import dal__mongodb from "./DAL/dal__mongodb";
import accountRouter from "./routes/accont.route";

// initialize the express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/account", accountRouter);

// Connect to the database
dal__mongodb.connect();

// Start the server
app.listen(config.app.port, () => {
  console.log(
    `Server is running on  http://${config.app.host}:${config.app.port}`
  );
});
