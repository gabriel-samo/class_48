import express from "express";
import cors from "cors";
import "dotenv/config";
import usersRouter from "./Routes/usersRouter";
import vehiclesRouter from "./Routes/vehiclesRouter";

const app = express();
// middleware or allowing cors
app.use(cors());
// built-in middleware for sending and receiving json
app.use(express.json());

// http://localhost:8080//vehicles
app.use("/vehicles", vehiclesRouter);
// http://localhost:8080/users
app.use("/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`http://${process.env.HOST}:${process.env.PORT}`);
});
