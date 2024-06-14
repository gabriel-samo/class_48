import cors from "cors";
import express from "express";
import config from "./utils/config";
import booksRouter from "./routes/booksRouter";

const app = express();

// Use Cors Option
// const corsOptions = {
//   origin: "*", //allow any origin
//   methods: ["GET", "POST", "DELETE"], //which methods i will allow
//   allowedHeaders: ["Content-Type", "Authorization"], //which headers i will get
//   exposedHeaders: ["Authorization"] //which headers i will expose
// };

// Middlewares:
app.use(cors());
app.use(express.json());

// Routes:
// http://localhost:8080/api/
app.use("/api/", booksRouter);

// Start the server:
app.listen(config.webPort, () => {
  console.log(`listing on http://${config.webHost}:${config.webPort}`);
});
