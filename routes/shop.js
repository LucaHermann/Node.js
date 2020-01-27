const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const shopController = require('../controllers/shop');

const router = express.Router();

//GET methods
router.get('/', shopController.getIndex);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
router.get('/products', shopController.getProducts);

module.exports = router;