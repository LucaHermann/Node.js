const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
  console.log('inside /users');
  res.send('<h1>hello users</h1>');
});

app.use('/', (req, res, next) => {
  console.log('inside /');
  res.send('<h1>hello world</h1>');
});

app.listen(3000)