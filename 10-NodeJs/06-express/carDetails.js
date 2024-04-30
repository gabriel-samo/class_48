const express = require('express');
const axios = require('axios');
const app = express();

const CAR_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=';
const TRUCK_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=cd3acc5c-03c3-4c89-9c54-d40f93c0d790&q=';
const BIKE_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=bf9df4e2-d90d-4c0a-a400-19e15af8e95f&q=';
const OFFROAD_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=851ecab1-0622-4dbe-a6c7-f950cf82abf9&q=';
const HANDICAP_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q='
const RECALL_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=36bf1404-0be4-49d2-82dc-2f1ead4a8b93&q='
const HOST = 'localhost';
const PORT = 3001;

app.get('/car/:carNumber', async (req, res) => {
  let carData = await axios.get(CAR_URL + req.params.carNumber);
  if (carData.data.result.records.length > 0) {
    res.send(carData.data.result.records[0]);
  } else {
    res.status(404).send('no car was found')
  }
})

app.get('/truck/:carNumber', async (req, res) => {
  let carData = await axios.get(TRUCK_URL + req.params.carNumber);
  if (carData.data.result.records.length > 0) {
    res.send(carData.data.result.records[0]);
  } else {
    res.status(404).send('no truck was found')
  }
})

app.get('/bike/:carNumber', async (req, res) => {
  let carData = await axios.get(BIKE_URL + req.params.carNumber);
  if (carData.data.result.records.length > 0) {
    res.send(carData.data.result.records[0]);
  } else {
    res.status(404).send('no bike was found')
  }
})

app.get('/offroad/:carNumber', async (req, res) => {
  let carData = await axios.get(OFFROAD_URL + req.params.carNumber);
  if (carData.data.result.records.length > 0) {
    res.send(carData.data.result.records[0]);
  } else {
    res.status(404).send('no offroad car was found')
  }
})

app.get('/handicap/:carNumber', async (req, res) => {
  let carData = await axios.get(HANDICAP_URL + req.params.carNumber);
  if (carData.data.result.records.length > 0) {
    res.send(carData.data.result.records[0]);
  } else {
    res.status(404).send('no handicap car was found')
  }
})

app.get('/recall/:carNumber', async (req, res) => {
  let carData = await axios.get(RECALL_URL + req.params.carNumber);
  if (carData.data.result.records.length > 0) {
    res.send(carData.data.result.records[0]);
  } else {
    res.status(404).send('no recall car was found')
  }
})


app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
})
