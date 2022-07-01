'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const Users = [
      {
        id: 1,
        full_name: 'user1',
        email: 'user1@binar.co.id',
        password: '123456',
        phone: '081234567890',
        city: 'Jakarta',
        address: 'Jl. Raya',
        image_url: 'https://www.angrybirds.com/wp-content/uploads/2022/05/ABCOM_202203_820x820_Dream_FrontPage_CharacterHero_Dimension-800x800.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        full_name: 'user2',
        email: 'user2@binar.co.id',
        password: '123456',
        phone: '081234567890',
        city: 'Jakarta',
        address: 'Jl. Raya',
        image_url: 'https://www.angrybirds.com/wp-content/uploads/2022/05/ABCOM_202203_820x820_Dream_FrontPage_CharacterHero_Dimension-800x800.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        full_name: 'user3',
        email: 'user3@binar.co.id',
        password: '123456',
        phone: '081234567890',
        city: 'Jakarta',
        address: 'Jl. Raya',
        image_url: 'https://www.angrybirds.com/wp-content/uploads/2022/05/ABCOM_202203_820x820_Dream_FrontPage_CharacterHero_Dimension-800x800.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        full_name: 'user1',
        email: 'user4@binar.co.id',
        password: '123456',
        phone: '081234567890',
        city: 'Jakarta',
        address: 'Jl. Raya',
        image_url: 'https://www.angrybirds.com/wp-content/uploads/2022/05/ABCOM_202203_820x820_Dream_FrontPage_CharacterHero_Dimension-800x800.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        full_name: 'user5',
        email: 'user5@binar.co.id',
        password: '123456',
        phone: '081234567890',
        city: 'Jakarta',
        address: 'Jl. Raya',
        image_url: 'https://www.angrybirds.com/wp-content/uploads/2022/05/ABCOM_202203_820x820_Dream_FrontPage_CharacterHero_Dimension-800x800.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
    return queryInterface.bulkInsert('Users', Users);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
