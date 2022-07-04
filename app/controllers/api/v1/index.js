/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const AuthenticationController = require("./AuthenticationController");
const ProductBuyerController = require("./ProductBuyerController")
const CategoryController = require("./CategoryController");
const ProductController = require('./ProductController');
const OrderController = require("./OrderController");

module.exports = {
  AuthenticationController,
  ProductBuyerController
};
