module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John',
      email: 'john@doe.com',
      password: 'one',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Smith',
      email: 'john@smith.com',
      password: 'two',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Stone',
      email: 'john@stone.com',
      password: 'three',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
