'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // have a relation one to many with products
      users.hasMany(models.products, {
        foreignKey: 'user_id',
        as: 'products'
      });
      // have a relation one to many with orders as buyer
      users.hasMany(models.orders, {
        foreignKey: 'buyer_id',
        as: 'orders'
      });
      // have a relation one to many with orders as seller
      users.hasMany(models.orders, {
        foreignKey: 'seller_id',
        as: 'orders'
      });
      // have a relation one to many with notification
      users.hasMany(models.notification, {
        foreignKey: 'receiver_id',
        as: 'notifications'
      });
    }
  }
  users.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    image_url: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
    paranoid: true,
    timestamps: true
  });
  return users;
};