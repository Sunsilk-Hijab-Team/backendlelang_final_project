/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const post = require("./post");
const AuthenticationController = require("./AuthenticationController");
const CategoryController = require("./CategoryController");
const ProductController = require('./ProductController');
const OrderController = require("./OrderController");

module.exports = {
  post,
  AuthenticationController,
  CategoryController,
  ProductController,
  OrderController
};
