const express = require("express");
const axios = require("axios");
const weatherRouter = express.Router();
const config = require("../config");

weatherRouter.post("/", async (req, res) => {
  try {
    const { cityName } = req.body;
    const apiKey = config.apiKey;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;
    const response = await axios.get(url);
    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

module.exports = weatherRouter;
