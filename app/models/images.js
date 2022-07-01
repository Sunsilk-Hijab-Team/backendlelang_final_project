'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // have a relation many to one with products
      // Images.belongsTo(models.Products, {
      //   foreignKey: 'product_id',
      //   as: 'products'
      // });

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