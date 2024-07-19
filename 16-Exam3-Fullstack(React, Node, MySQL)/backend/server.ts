import cors from "cors";
import express from "express";
import { config } from "./config/config";
import meetingsRouter from "./routes/meetingsRouter";
import teamsRouter from "./routes/teamsRouter";

// initializing express as 'app'
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/meetings", meetingsRouter);
app.use("/api/teams", teamsRouter);
// testing server
app.get("/", (req, res) => {
  res.status(200).json("WORKING!!! :)");
});

// extracting to variables the port and the host form config
const { port, host } = config.app;
// runnig the app and listening on a predefined port
app.listen(port, () => {
  console.log(`listening on http://${host}:${port}`);
});
