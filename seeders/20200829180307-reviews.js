module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [{
      text: 'review 1',
      stars: 1,
      userId: 1,
      bookId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      text: 'review 2',
      stars: 2,
      userId: 2,
      bookId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      text: 'review 3',
      stars: 3,
      userId: 3,
      bookId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
