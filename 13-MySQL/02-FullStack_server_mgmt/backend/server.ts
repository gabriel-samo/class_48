import express from "express";
import cors from "cors";
import serverRouter from "./routes/serverRouter";
import config from "./config";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/servers", serverRouter);

const port = config.app.port || 8080;
const host = config.app.host;
app.listen(port, () => console.log(`http://${host}:${port}`));
