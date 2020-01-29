const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    path: '/admin/add-product',
    pageTitle: 'Add Product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, price, description);
  product.saveProduct();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/admin/products');
  }
  const productId = req.params.productId;
  Product.findById(productId, product => {
    if (!product) {
      res.redirect('/');
    }
    res.render('admin/edit-product', {
      path: '/admin/edit-product',
      pageTitle: 'Edit Product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
  updatedProduct.saveProduct();
  res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteProductById(productId);
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render('admin/product-list', {
      prods: products,
      path: '/admin/products',
      pageTitle: 'Admin Products List'
    });
  });
};
