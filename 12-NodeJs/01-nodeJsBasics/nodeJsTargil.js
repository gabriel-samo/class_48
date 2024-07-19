const http = require('http');
const url = require('url');

const PORT = 8081;

const server = http.createServer((req, res) => {

  const query = url.parse(req.url, true).query;

  const htmlBody = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Second Node.js App</title>
  </head>
  <body>
    <h1>Targil 1</h1>
    <hr/>
    <p>Hello ${query.firstName} ${query.lastName}, We saw that you are living at ${query.city}, 
    Could you give a ride to ${query.friend}?</p>
    <p>All Rights Reserved to Gabriel Samoylov(c)</p>
  `
  res.write(htmlBody);
  res.end();
}).listen(PORT);

console.log(`Server running on  http://localhost:${PORT}`);