const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(req.body.title);
  product.saveProduct();
  res.redirect('/');
};

exports.getShop = (req, res) => {
  Product.fetchProduct((products) => {
    res.render('shop', {
      prods: products,
      pageTitle: 'shop',
      path: '/'
    });
  });
};