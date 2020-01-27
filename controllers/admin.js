const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    path: '/admin/add-product',
    pageTitle: 'Add Product'
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.saveProduct();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    path: '/admin/edit-product',
    pageTitle: 'Edit Product'
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render('admin/product-list', {
      prods: products,
      path: '/admin/products',
      pageTitle: 'Admin Products List'
    });
  });
};