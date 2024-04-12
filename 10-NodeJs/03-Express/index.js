const fs = require('fs');

// Exercise 1: loop through 1 to 1000 and log 'BOOM' if the number contains 7 or divided by 7.
function ifSeven() {
  // check if there isn't a folder 'log'. 
  if (!fs.existsSync('./log')) {
    // create a folder named 'log'.
    fs.mkdirSync('./log');
  }
  for (let i = 1; i <= 1000; i++) {
    // checking if a number contains 7 or divided by seven with no reminder.
    if (i.toString().includes('7') || i % 7 === 0) {
      // if true than writing to the file 'BOOM' with the number in parenthesis.
      fs.appendFileSync('./log/log.txt', `BOOM\t(${i})\n`);
    } else {
      // if false writing only the file.
      fs.appendFileSync('./log/log.txt', `${i}\n`);
    }
  }
}
// calling the function...
// ifSeven();

//====================================================================================================================================

// Exercise 2: write an object to a separate file and read it form index.js.
myData = {
  "name": "Gabriel",
  "age": 30,
  "address": "Haifa",
  "password": "ssshhh"
}

function writeDataToFile(myData) {
  // checking if file 'my-data.json' exists
  if (!fs.existsSync('./data/my-data.json')) {
    // if false, creating and writing to 'my-data.json' the 'myData' object after stringify the object.
    fs.writeFileSync('./data/my-data.json', JSON.stringify(myData));
    console.log('File was created!');
  }
}

function readDataFromFile() {
  // checking if 'my-data.json' exists.
  if (fs.existsSync('./data/my-data.json')) {
    // if true parsing the extracting the 'name' and the 'address' fields 
    const { name, address } = JSON.parse(fs.readFileSync('./data/my-data.json', { encoding: 'utf8' }));
    console.log(`\nMy name is ${name}\nI live in ${address}`);
  }
}

writeDataToFile(myData);
readDataFromFile();



