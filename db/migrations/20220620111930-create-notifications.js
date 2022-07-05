'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: {
        //     tableName: 'Orders',
        //     key: 'id',
        //   }
        // }
      },
      read_status: {
        type: Sequelize.STRING
      },
      receiver_id: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: {
        //     tableName: 'Users',
        //     key: 'id',
        //   }
        // }
      },
      transaction_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Notifications');
  }
};