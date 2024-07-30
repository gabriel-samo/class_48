import cors from "cors";
import express from "express";
import config from "./Utils/config";
import songRouter from "./Routes/songRoute";
import dal__mongodb from "./DAL/dal__mongodb";
import categoryRouter from "./Routes/categoryRoute";
import ErrorHandler from "./MiddleWare/routeNotFound";

//create server
const server = express();

//use Cors Option
const corsOptions = {
  origin: "*", //allow any origin
  methods: ["GET", "POST", "DELETE", "PATCH"], //which methods i will allow
  allowedHeaders: ["Content-Type", "Authorization"], //which headers i will get
  exposedHeaders: ["Authorization"] //which headers i will expose
};

//cors = cross origin research sharing...
server.use(cors(corsOptions));

//how we send the data back (JSON,XML,RAW,String)
server.use(express.json());

//routes
server.use("/api/songs", songRouter);
server.use("/api/categories", categoryRouter);

//404 handler
server.use("*", ErrorHandler);

//make the connection to mongoDB
dal__mongodb.connect();

//start the server
server.listen(config.webPort, () => {
  console.log(`listing on http://${config.webHost}:${config.webPort}`);
});
