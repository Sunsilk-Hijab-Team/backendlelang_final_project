'use strict';
// const {Users, Categories, Orders, Images} = require('../models');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      // have a relation many to one with users
      Products.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'users'
      });
      // have a relation one to many with images

      Products.hasMany(models.Images, {
        foreignKey: 'product_id',
        as: 'images'
      });
      // have a relation one to many with orders as buyer

      Products.hasMany(models.Orders, {
        foreignKey: 'product_id',
        as: 'orders_product'
      });
      // have a relation one to many with orders as seller

      Products.hasMany(models.Orders, {
        foreignKey: 'seller_id',
        as: 'orders_seller'
      });
      // have a relation many to one with categories

      Products.belongsTo(models.Categories, {
        foreignKey: 'categories_id',
        as: 'categories'
      });

    }
  }
  Products.init({
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    // published: DataTypes.ENUM,
    categories_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    base_price: DataTypes.BIGINT,
    status: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Products'
  });
  return Products;
};