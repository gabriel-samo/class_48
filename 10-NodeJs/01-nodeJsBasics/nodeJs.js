let http = require('http');
let url = require('url')
let { seasonName } = require('./seasons');

const PORT = 8080;

let server = http.createServer((req, res) => {

  let query = url.parse(req.url, true).query;

  const htmlBody = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>First Node.js App</title>
  </head>
  <body>
    <h1>Hello Class 48</h1>
    <hr/>
    <p>Gabriel Samoylov</p>
    <hr/>
    <p>Winter in Hebrew: ${seasonName(query.season)}</p>
    <hr/>
    <p>All Right Reserved by Gabriel (c)</p>
  </body>
  </html>
  `;

  res.writeHead(200, { 'Content-type': 'text/html' });
  res.write(htmlBody);
  res.end();
}).listen(PORT);

console.log('Server is running on http://localhost:' + PORT);