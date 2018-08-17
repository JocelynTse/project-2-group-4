module.exports = function(sequelize, DataTypes) {
    var wishlists = sequelize.define("wishlists", {
      _name: DataTypes.STRING,
      creatorID: DataTypes.INTEGER
    });
    return wishlists;
  };
  