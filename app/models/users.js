'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // have a relation one to many with products

      // Users.hasMany(models.Products, {
      //   foreignKey: 'user_id',
      //   as: 'products'
      // });
      // have a relation one to many with orders as buyer

      // Users.hasMany(models.Orders, {
      //   foreignKey: 'buyer_id',
      //   as: 'orders'
      // });
      // have a relation one to many with orders as seller

      // Users.hasMany(models.Orders, {
      //   foreignKey: 'seller_id',
      //   as: 'orders'
      // });
      // have a relation one to many with notification

      // Users.hasMany(models.Notification, {
      //   foreignKey: 'receiver_id',
      //   as: 'notifications'
      // });
    }
  }
  Users.init({
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
    modelName: 'Users',
    paranoid: true,
    timestamps: true
  });
  return Users;
};