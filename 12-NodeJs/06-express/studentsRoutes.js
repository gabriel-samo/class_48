const express = require('express');
const app = express();
const students = require('./data/students.js');
const PORT = 8080;

app.get('/', (req, res) => {
  res.send(students);
})

app.get('/:id', (req, res) => {
  res.send(
    students.find(person => person.id == req.params.id)
  );
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})