module.exports = function (sequelize, DataTypes) {
  var subscriptions = sequelize.define("subscriptions", {
    userID: DataTypes.INTEGER,
    wishlistID: DataTypes.INTEGER
  });
  return subscriptions;
};