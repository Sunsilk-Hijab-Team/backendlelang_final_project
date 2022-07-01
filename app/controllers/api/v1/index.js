/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const post = require("./post");
const AuthenticationController = require("./AuthenticationController");
const ProductBuyerController = require("./ProductBuyerController")
const CategoryController = require("./CategoryController");

module.exports = {
  post,
  AuthenticationController,
  ProductBuyerController
};
