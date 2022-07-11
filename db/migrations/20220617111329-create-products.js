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
        type: Sequelize.ENUM,
        values:['available','sold','deleted']
      },
      // published:{
      //   type: Sequelize.ENUM,
      //   values: ['true', 'false']
      // },
      categories_id: {
        type: Sequelize.INTEGER,
        // references:{
        //   model: {
        //     tableName: 'categories',
        //     key: 'id',
        //   }
        // }

      },
      published: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};