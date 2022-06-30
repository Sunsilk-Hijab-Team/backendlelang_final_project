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
        type: Sequelize.STRING
========
        references:{
          model: {
            tableName: 'categories',
            key: 'id',
          }
        },
>>>>>>>> 5e85b00ade482cde90f1ad4c3db5ad40c9eb0cab:db/migrations/20220617111329-create-products.js
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