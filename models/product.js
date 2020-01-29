const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');
const Cart = require('./cart');

const pathFile = path.join(rootDir, 'data', 'products.json');

//Read the file and fetch all products inside
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
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  saveProduct() {
    getProductsFromFile(products => {
      // Update a product and push the new data inside the json
      if (this.id) {
        const existingProductIndex = products.findIndex(product => product.id === this.id);
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(pathFile, JSON.stringify(updatedProduct), err => console.log(err));
      } else {
        // Send new product to products.json
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(pathFile, JSON.stringify(products), err => console.log(err));
      }
    });
  }

  static deleteProductById(id) {
    //Fetch all products
    getProductsFromFile(products => {
      // Find the product by id
      const product = products.find(product => product.id === id);
      const productToDelete = products.filter(product => product.id !== id);
      fs.writeFile(pathFile, JSON.stringify(productToDelete), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        };
      });
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