module.exports = function(sequelize, DataTypes) {
    var wishlists = sequelize.define("wishlists", {
      _name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        }
        },
      creatorID: DataTypes.INTEGER
    });
    return wishlists;
  };
  