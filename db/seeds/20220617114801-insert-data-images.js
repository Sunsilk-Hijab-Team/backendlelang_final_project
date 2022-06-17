'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const images = [
      // bulk data images
      { id: 1,
        image_url: 'https://www.tokopedia.com/images/product/25/2524/2524098/large/laptop-lenovo-thinkpad-x1-carbon-laptop-intel-core-i7-8th-gen-i7-8750h-16gb-1tb-win-10-black.jpg',
        product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date() },
      { id: 2,
        image_url: 'https://www.tokopedia.com/images/product/25/2524/2524098/large/laptop-lenovo-thinkpad-x1-carbon-laptop-intel-core-i7-8th-gen-i7-8750h-16gb-1tb-win-10-black.jpg',
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date() },
      { id: 3,
        image_url: 'https://www.tokopedia.com/images/product/25/2524/2524098/large/laptop-lenovo-thinkpad-x1-carbon-laptop-intel-core-i7-8th-gen-i7-8750h-16gb-1tb-win-10-black.jpg',
        product_id: 3,
        createdAt: new Date(),
        updatedAt: new Date() },
      { id: 4,
        image_url: 'https://www.tokopedia.com/images/product/25/2524/2524098/large/laptop-lenovo-thinkpad-x1-carbon-laptop-intel-core-i7-8th-gen-i7-8750h-16gb-1tb-win-10-black.jpg',
        product_id: 4,
        createdAt: new Date(),
        updatedAt: new Date() },
      { id: 5,
        image_url: 'https://www.tokopedia.com/images/product/25/2524/2524098/large/laptop-lenovo-thinkpad-x1-carbon-laptop-intel-core-i7-8th-gen-i7-8750h-16gb-1tb-win-10-black.jpg',
        product_id: 5,
        createdAt: new Date(),
        updatedAt: new Date() }
    ]
  },

  async down (queryInterface, Sequelize) {
    // delete
    await queryInterface.bulkDelete('images', null, {});
  }
};
