'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        // references:{
        //   model: {
        //     tableName: 'Users',
        //     key: 'id',
        //   }
        // }
      },
      categories_id: {
        type: Sequelize.INTEGER,
        // references:{
        //   model: {
        //     tableName: 'Categories',
        //     key: 'id',
        //   }
        // }
      },
      name: {
        type: Sequelize.STRING,
        references:{
          model: {
            tableName: 'categories',
            key: 'id',
          }
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};