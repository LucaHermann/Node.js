const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>message</title></head>');
    res.write('<body><form action="/message" method="POST">');
    res.write('<input type="text" name="message"><button type="submit">Click me</button>');
    res.write('</form></body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => { // if i dont put a return before req.on line 33 will be exectued first and do a ERR_HTTP_HEADERS_SENT error.
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        if (err != null) {
          console.log(err);
        } else {
          console.log('message.txt successfully created and stored inside the server.');
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        }
      });
    });
  }
  res.setHeader('Content-type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node Server</title></head>');
  res.write('<body><h1>Welcome on my node.js server</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = requestHandler;