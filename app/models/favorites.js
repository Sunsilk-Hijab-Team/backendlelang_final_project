'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // have a relation one to one with products
      Favorites.hasOne(models.Products, {
        foreignKey: 'product_id',
        as: 'favorite_product'
      })
      // have a relation many to one with users
      Favorites.belongsTo(models.Users, {
        foreignKey: 'buyer_id',
        as: 'favorite_buyer'
      })

      // have a relation many to one with users
      Favorites.belongsTo(models.Users, {
        foreignKey: 'seller_id',
        as: 'favorite_seller'
      })

    }
  }
  Favorites.init({
    id_product: DataTypes.STRING,
    buyer_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorites',
  });
  return Favorites;
};