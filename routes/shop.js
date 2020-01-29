const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const shopController = require('../controllers/shop');

const router = express.Router();

//GET methods
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProductDetails);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);
//POST methods
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteItem);

module.exports = router;