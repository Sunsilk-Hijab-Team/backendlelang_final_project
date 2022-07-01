'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    timestamps: true,
    paranoid: true
  });
  return Categories;
};