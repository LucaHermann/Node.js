const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const productController = require('../controllers/products');

const router = express.Router();

router.get('/', productController.getProducts);

module.exports = router;