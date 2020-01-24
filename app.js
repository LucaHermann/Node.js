const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = ('./routes/admin');
const shopRoutes = ('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.listen(3000);