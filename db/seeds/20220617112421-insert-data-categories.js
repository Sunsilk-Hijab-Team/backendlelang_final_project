'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = [
      { id: 1, name: 'Elektronik', slug:'elektronik', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Fashion', slug:'fashion', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Komputer', slug:'komputer', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Hobi', slug:'hobi', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Otomotif', slug:'otomotif', createdAt: new Date(), updatedAt: new Date() },
    ];
    await queryInterface.bulkInsert('categories', categories);
  },

  async down (queryInterface, Sequelize) {
    // delete
    await queryInterface.bulkDelete('categories', null, {});
  }
};
