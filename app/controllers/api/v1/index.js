/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

const AuthenticationController = require("./AuthenticationController");
const CategoryController = require("./CategoryController");
const ProductController = require('./ProductController');
const OrderController = require("./OrderController");
const NotificationController = require("./NotificationController");
const ProductBuyerController = require("./ProductBuyerController");
const OrderBuyerController = require("./OrderBuyerController");

module.exports = {
  AuthenticationController,
  CategoryController,
  ProductController,
  OrderController,
  NotificationController,
  ProductBuyerController,
  OrderBuyerController
};
