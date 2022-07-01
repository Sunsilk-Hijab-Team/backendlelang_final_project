'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {

    static associate(models) {
      // have a relation many to one with users as buyer
      orders.belongsTo(models.users, {
        foreignKey: 'buyer_id',
        as: 'users'
      });
      // have a relation many to one with users as seller
      orders.belongsTo(models.users, {
        foreignKey: 'seller_id',
        as: 'users'
      });
      // have a relation many to one with products
      orders.belongsTo(models.products, {
        foreignKey: 'product_id',
        as: 'products'
      });
      // have a relation one to many with notifications
      orders.hasMany(models.notifications, {
        foreignKey: 'order_id',
        as: 'notifications'
      });
    }
  }
  orders.init({
    product_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    bid_price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    seller_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'orders',
    timestamps: true,
    paranoid: true
  });
  return orders;
};