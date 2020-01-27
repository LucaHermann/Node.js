const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    path: '/admin/add-product',
    pageTitle: 'Add Product'
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description);
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