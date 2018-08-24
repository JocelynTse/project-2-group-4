module.exports = function(sequelize, DataTypes) {
    var wishlists = sequelize.define("wishlists", {
      _name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 250]
        }
        },
        private:{
          type: DataTypes.BOOLEAN,
          allowNull:false,
          default:false
        },
      creatorID: DataTypes.INTEGER
    });
    return wishlists;
  };
  