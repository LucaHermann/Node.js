const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>assignment 1</title></head>');
    res.write('<body>Welcome on my node.js server</body>');
    res.write('<form action="/create-user" method="POST"><input type="text" name="create-user"><button type="submit">Submit Username</button></form>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log('your username is:', username);
    });
  }
  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>assignment 1</title></head>');
    res.write('<body><ul><li>user 1</li><li>user 2</li><li>user 3</li></ul></body>');
    res.write('</html>');
    return res.end();
  }
  res.setHeader('Content-type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node Server</title></head>');
  res.write('<body><h1>Welcome on my node.js server</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = requestHandler;