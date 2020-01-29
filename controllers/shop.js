const Product = require('../models/product');
const Cart = require('../models/cart');

// Fetch products from products.json and render a product list
exports.getProducts = (req, res, next) => {
  Product.fetchProduct((products) => {
    res.render('shop/product-list', {
      prods: products,
      path: '/products',
      pageTitle: 'Products List'
    });
  });
};
// Find the product by id and render all details
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
// Fetch the cart.json 
// Check inside product.json if the id match and send data to cart (qty, price, ...)
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchProduct(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Cart',
        products: cartProducts
      });
    });
  });
};
//Find by id a product inside products.json and add it to cart.json if the product exist
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart');
}

exports.postCartDeleteItem = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart');
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
