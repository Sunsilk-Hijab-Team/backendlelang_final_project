'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // have a relation many to one with users

      // Notifications.belongsTo(models.Users, {
      //   foreignKey: 'receiver_id',
      // as: 'users'
      // });
      // have a relation many to one with orders

      // Notifications.belongsTo(models.Orders, {
      //   foreignKey: 'order_id',
      // as: 'orders'
      // });
    }
  }
  Notifications.init({
    order_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    receiver_id: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Notifications',
    timestamps: true,
    paranoid: true
  });
  return Notifications;
};