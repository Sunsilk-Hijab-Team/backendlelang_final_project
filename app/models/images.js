'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // have a relation many to one with products
      Images.belongsTo(models.products, {
        foreignKey: 'product_id',
        as: 'products'
      });

    }
  }
  images.init({
    image_url: DataTypes.STRING,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'images',
  });
  return images;
};