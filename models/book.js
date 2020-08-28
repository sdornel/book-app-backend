module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      pages: {
        type: Sequelize.INTEGER
      }
    });
  
    return Book;
  };