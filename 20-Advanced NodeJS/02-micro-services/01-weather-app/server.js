const express = require("express");
const config = require("./config");
const bodyParser = require("body-parser");

const aboutRouter = require("./routes/about.js");
const weatherRouter = require("./routes/weather.js");

const PORT = 3000;
const HOST_NAME = "localhost";

const app = express();
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/weather", weatherRouter);
app.use("/about", aboutRouter);

app.listen(config.port, config.host, () => {
  console.log(`Server is running on http://${config.host}:${config.port}`);
});
