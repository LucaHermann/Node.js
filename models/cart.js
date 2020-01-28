const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const pathFile = path.join(rootDir, 'data', 'cart.json');

class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(pathFile, (err, fileContent) => {
      let cart = { "products": [], "totalPrice": 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => find existing products
      // if you add a new product existingProductIndex will be -1
      // if it's a product already on the cart it's 0
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        // Increase qty if existing product
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        // Create a new object for store the object
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      // Update the cart price
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(pathFile, JSON.stringify(cart), err => console.log(err));
    });
  }
};

module.exports = Cart;