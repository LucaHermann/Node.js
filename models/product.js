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
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(pathFile, JSON.stringify(products), err => console.log(err));
    });
  }

  static fetchProduct(callback) {
    getProductsFromFile(callback);
  };
};

module.exports = Product;