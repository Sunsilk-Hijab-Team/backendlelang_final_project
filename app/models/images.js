'use strict';
// const {Products}=require('../models');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    static associate(models) {
      // have a relation many to one with products
      Images.belongsTo(models.Products, {
        foreignKey: 'product_id',
        as: 'products'
      });

    }
  }
  Images.init({
    image_url: DataTypes.STRING,
    product_id: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Images',
    timestamps: true,
    paranoid: true
  });
  return Images;
};