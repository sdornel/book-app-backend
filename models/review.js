module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {});
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, { // maybe delete this
      foreignKey: 'userId'
    })
    Review.belongsTo(models.Book, { // maybe delete this
      foreignKey: 'bookId'
    })
  };
  return Review;
};