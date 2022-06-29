'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // have a relation many to one with users
      Products.belongsTo(models.users, {
        foreignKey: 'user_id',
        as: 'users'
      });
      // have a relation one to many with images
      Products.hasMany(models.images, {
        foreignKey: 'product_id',
        as: 'images'
      });
      // have a relation one to many with orders as buyer
      Products.hasMany(models.orders, {
        foreignKey: 'buyer_id',
        as: 'orders'
      });
      // have a relation one to many with orders as seller
      Products.hasMany(models.orders, {
        foreignKey: 'seller_id',
        as: 'orders'
      });
      // have a relation one to many with categories
      Products.belongsTo(models.categories, {
        foreignKey: 'categories_id',
        as: 'categories'
      });

    }
  }
  Products.init({
    user_id: DataTypes.INTEGER,
    categories_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};