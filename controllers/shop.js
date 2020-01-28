const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render('shop/product-list', {
      prods: products,
      path: '/products',
      pageTitle: 'Products List'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render('shop/index', {
      prods: products,
      path: '/',
      pageTitle: 'Shop'
    });
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Cart'
  });
};

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

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, product => {
    console.log(product);
    res.render('shop/product-detail', {
      product: product,
      path: '/products',
      pageTitle: 'Product Details'
    })
  });
}