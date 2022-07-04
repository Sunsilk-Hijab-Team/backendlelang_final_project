'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    static associate(models) {
      // have a relation many to one with users
      // Products.belongsTo(models.Users, {
      //   foreignKey: 'user_id',
      //   // as: 'users'
      // });
      // have a relation one to many with images

      // Products.hasMany(models.Images, {
      //   foreignKey: 'product_id',
      //   as: 'images'
      // });
      // have a relation one to many with orders as buyer

      // Products.hasMany(models.Orders, {
      //   foreignKey: 'product_id',
      //   // as: 'orders'
      // });
      // have a relation one to many with orders as seller

      // Products.hasMany(models.Orders, {
      //   foreignKey: 'seller_id',
      //   as: 'orders'
      // });
      // have a relation many to one with categories

      // Products.belongsTo(models.Categories, {
      //   foreignKey: 'categories_id',
      //   as: 'categories'
      // });

    }
  }
  products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    base_price: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    categories_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'products'
  });
  return products;
};