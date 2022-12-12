'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456', //plain text cdafafadfsaf=>hash password nâng cao mức độ bảo mật cho tk
      firstName: 'Nguyen',
      lastName: 'Doe',
      address: 'VN',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  // up chạy bình thường thêm dữ liệu vào
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
//down muốn cancel , sử dụng rollback để back lại version chuaư bị lỗi
