'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
 
    static associate(models) {
      // have a relation many to one with products
      Categories.hasMany(models.products, {
        foreignKey: 'categories_id',
        as: 'products'
      });
    }
  }
  Categories.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};