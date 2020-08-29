module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', [{
      title: 'book 1',
      author: 'author 1',
      pages: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'book 2',
      author: 'author 2',
      pages: 2000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'book 3',
      author: 'author 3',
      pages: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null, {});
  }
};