const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 8080;

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const language = urlInfo.query.language;

  fs.readFile(language === 'hebrew' ? './hebrew.html' : './english.html', (err, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });

}).listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));