'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {

    static associate(models) {
      // have a relation many to one with users
      notifications.belongsTo(models.users, {
        foreignKey: 'receiver_id',
        as: 'users'
      });
      // have a relation many to one with orders
      notifications.belongsTo(models.orders, {
        foreignKey: 'order_id',
        as: 'orders'
      });
    }
  }
  notifications.init({
    order_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    receiver_id: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'notifications',
    timestamps: true,
    paranoid: true
  });
  return notifications;
};