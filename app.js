const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="/message"><button type="submit">Click me</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'DUMMY');
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node Server</title></head>');
  res.write('<body>Welcome on my node.js server</body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);