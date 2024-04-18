// requiring the fs library (file system)
const fs = require('fs');
// first need to install, 'npm install axios'
// and then requiring the axios library
const axios = require('axios');

// saving the URL to a constant
const CAR_DATA_URL = 'https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q='

// declaring an async function that accepts 1 argument, the car number. 
const writeCarData = async (carNumber) => {
  try {
    // calling the api with the given car number.
    const response = await axios.get(CAR_DATA_URL + carNumber);
    // storing the specific result in a constant.
    const carDetails = await response.data.result.records[0];
    // checking if the cars.json file exists,
    if (fs.existsSync('data/cars.json')) {
      // if the file exists then we storing the previous data in a constant
      const prevData = JSON.parse(fs.readFileSync('data/cars.json'));
      // and checking if the specific car is already in the cars.json file.
      const duplicate = prevData.find(car => car.mispar_rechev === carDetails.mispar_rechev)
      // if the car details os NOT empty and its not exist in the file
      if (carDetails !== undefined && !duplicate) {
        // then writing to the file the previous data with the new car.
        fs.writeFileSync('data/cars.json', JSON.stringify([...prevData, carDetails]));
      }
      // if the file doesn't exist than creating the file with the first car.
    } else {
      carDetails && fs.writeFileSync('data/cars.json', JSON.stringify([carDetails]));
    }
  } catch (err) {
    // if there is an error logging the error to the console.
    console.log(err);
  }
}

// declaring an async function that will add the cars in order.
const addCars = async () => {
  await writeCarData(6225431);
  await writeCarData(6225432);
  await writeCarData(6225433);
  await writeCarData(6225434);
  await writeCarData(6225437);
  await writeCarData(6225438);
  await writeCarData(6225439);
}

// calling the function
addCars();