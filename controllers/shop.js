const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render('shop/product-list', {
      prods: products,
      path: '/products',
      pageTitle: 'Products List'
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, product => {
    res.render('shop/product-detail', {
      product: product,
      path: '/products',
      pageTitle: 'Product Details'
    });
  });
}

exports.getIndex = (req, res, next) => {
  res.render('shop/index', {
    path: '/',
    pageTitle: 'Shop'
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Cart'
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart');
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Orders'
  });
};
