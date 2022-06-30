'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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