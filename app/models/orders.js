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
      // have a relation many to one with users as buyer
      orders.belongsTo(models.users, {
        foreignKey: 'buyer_id',
        as: 'buyer'
      });
      // have a relation many to one with users as seller
      orders.belongsTo(models.users, {
        foreignKey: 'seller_id',
        as: 'seller'
      });
    }
  }
  orders.init({
    product_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    bid_price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    seller_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};