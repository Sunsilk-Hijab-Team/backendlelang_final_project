'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description:{
        type: Sequelize.STRING
      },
      base_price:{
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        // references:{
        //   model: {
        //     tableName: 'Users',
        //     key: 'id',
        //   }
        // },
      },
      status:{
        type: Sequelize.STRING
      },
      published:{
        type: Sequelize.BOOLEAN
      },
      categories_id: {
        type: Sequelize.INTEGER,
        // references:{
        //   model: {
        //     tableName: 'categories',
        //     key: 'id',
        //   }
        // }

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};