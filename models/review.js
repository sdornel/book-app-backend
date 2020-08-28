module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
      text: {
        type: Sequelize.TEXT
      },
      stars: {
        type: Sequelize.STRING
      }
    });
  
    return Review;
  };