'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const products = [
      // bulk data products
      { id: 1, 
        name: 'Laptop', 
        base_price: 100000, 
        description: 'Laptop', 
        user_id: 1,
        status: 'available',
        category_id: 1, 
        createdAt: new Date(), 
        updatedAt: new Date() },
      { id: 2,
        name: 'Handphone',
        base_price: 100000,
        description: 'Handphone',
        user_id: 2,
        status: 'available',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date() },
      { id: 3,
        name: 'Kamera',
        base_price: 100000,
        description: 'Kamera',
        user_id: 3,
        status: 'available',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date() },
      { id: 4,
        name: 'Laptop',
        base_price: 100000,
        description: 'Laptop',
        user_id: 4,
        status: 'available',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date() },
      { id: 5,
        name: 'Laptop',
        base_price: 100000,
        description: 'Laptop',
        user_id: 5,
        status: 'available',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date() }
    ]
  },

  async down (queryInterface, Sequelize) {
    // delete
    await queryInterface.bulkDelete('products', null, {});
  }
};
