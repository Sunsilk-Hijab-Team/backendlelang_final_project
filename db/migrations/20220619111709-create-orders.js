'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.STRING,
        // references:{
        //   model: {
        //     tableName: 'Products',
        //     key: 'id',
        //   }
        // }
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        // references:{
        //   model: {
        //     tableName: 'Users',
        //     key: 'id',
        //   }
        // }
      },
      bid_price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'accepted', 'rejected']
      },
      seller_id: {
        type: Sequelize.INTEGER,
        // references:{
        //   model: {
        //     tableName: 'Users',
        //     key: 'id',
        //   }
        // }
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
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};