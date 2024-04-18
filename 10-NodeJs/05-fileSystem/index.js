// const fs = require('fs');
const fsPromises = require('fs').promises;

const myGrades = [
  { name: "Name1", grade: 86 },
  { name: "Name2", grade: 85 },
  { name: "Name3", grade: 63 },
  { name: "Name4", grade: 65 },
  { name: "Name5", grade: 32 }
]

const writeData = async () => {
  myGrades.push({ name: "Name6", grade: 49 });
  await fsPromises.writeFile('data/grades.json', JSON.stringify(myGrades));
};

writeData();