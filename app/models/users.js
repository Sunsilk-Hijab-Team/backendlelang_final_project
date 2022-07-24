'use strict';
// const {Products, Orders, Notifications}=require('../models');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // have a relation one to many with products

      Users.hasMany(models.Products, {
        foreignKey: 'user_id',
        as: 'products'
      });
      // have a relation one to many with orders as buyer

      Users.hasMany(models.Orders, {
        foreignKey: 'buyer_id',
        as: 'orders_buyer'
      });
      // have a relation one to many with orders as seller

      Users.hasMany(models.Orders, {
        foreignKey: 'seller_id',
        as: 'orders_seller'
      });
      // have a relation one to many with notification

      Users.hasMany(models.Notifications, {
        foreignKey: 'receiver_id',
        as: 'notifications'
      });

      // have a relation one to many with favorites
      Users.hasMany(models.Favorites, {
        foreignKey: 'buyer_id',
        as: 'favorite_buyer'
      });

      // have a relation one to many with favorites
      Users.hasMany(models.Favorites, {
        foreignKey: 'seller_id',
        as: 'favorite_seller'
      });
    }
  }
  Users.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    image_url: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Users',
    paranoid: true,
    timestamps: true
  });
  return Users;
};