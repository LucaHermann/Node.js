const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Users</title></head>');
    res.write('<body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>')
    res.write('</html>');
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      console.log(username);
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Assignment 1</title></head>');
  res.write('<body><h1>Some greeting</h1>');
  res.write('<form action="/create-user" method="POST"><input name="create-user" type="text"><button type="submit">Send username</button></form>')
  res.write('</body>')
  res.write('</html>');
  res.end();
});

server.listen(3000);