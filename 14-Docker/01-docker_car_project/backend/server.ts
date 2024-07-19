import express from "express";
import cors from "cors";
import usersRouter from "./Routes/usersRouter";
import vehiclesRouter from "./Routes/vehiclesRouter";
import { config } from "./Utils/config";

const app = express();
// middleware or allowing cors
app.use(cors());
// built-in middleware for sending and receiving json
app.use(express.json());

// http://localhost:8080//vehicles
app.use("/vehicles", vehiclesRouter);
// http://localhost:8080/users
app.use("/users", usersRouter);

app.listen(config.app.port, () => {
  console.log(`http://${config.app.host}:${config.app.port}`);
});
