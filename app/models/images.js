'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images extends Model {

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
    product_id: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'images',
    timestamps: true,
    paranoid: true
  });
  return images;
};