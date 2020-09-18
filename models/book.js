module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    pages: DataTypes.INTEGER,
  }, {});
  Book.associate = function (models) {
    Book.hasMany(models.Review, {
      foreignKey: 'bookId'
    })
  };
  return Book;
};