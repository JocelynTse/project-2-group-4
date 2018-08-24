module.exports = function(sequelize, DataTypes) {
    var comments = sequelize.define("comments", {
      msg: DataTypes.TEXT,
      poster: DataTypes.STRING,
      wishlistID: DataTypes.INTEGER
    });
    return comments;
  };
  