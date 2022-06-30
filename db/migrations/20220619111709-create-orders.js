'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.STRING,
        references:{
          model: {
            tableName: 'products',
            key: 'id',
          }
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'users',
            key: 'id',
          }
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      bid_price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'users',
            key: 'id',
          }
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};