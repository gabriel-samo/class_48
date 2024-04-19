const axios = require('axios');
const express = require('express');
const app = express();

const PORT = 3001;
const HOST = 'localhost';
const CAR_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q='

app.get('/car/:carNumber', async (req, res) => {
  let carData = await axios.get(CAR_URL + req.params.carNumber);
  res.send(carData.data.result.records[0]);
})

app.listen(PORT, () => {
  console.log(`http://${HOST}:${PORT}`);
})
