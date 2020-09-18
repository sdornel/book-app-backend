module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.User, {
      foreignKey: 'userId'
    })
    Review.belongsTo(models.Book, { 
      foreignKey: 'bookId'
    })
  };
  return Review;
};