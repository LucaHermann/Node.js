const path = require('path');

const express = require('express');

const rootDir = require('./utils/path');

const app = express();

const usersRoutes = require('./routes/users');
const homeRoutes = require('./routes/home');

app.use(express.static(path.join(rootDir, 'public')));

app.use(usersRoutes);
app.use(homeRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(8080);