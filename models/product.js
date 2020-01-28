const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');

const pathFile = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(pathFile, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
}

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  saveProduct() {
    this.id = Math.random().toString();
    // Send new product to products.json
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(pathFile, JSON.stringify(products), err => console.log(err));
    });
  }

  static fetchProduct(callback) {
    // Fetch all products inside the products.json
    getProductsFromFile(callback);
  };

  static findById(id, callback) {
    // Fetch the product by checking id and retreive the right product
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      callback(product);
    });
  }
};

module.exports = Product;