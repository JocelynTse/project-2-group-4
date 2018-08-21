module.exports = function(sequelize, DataTypes) {
    var items = sequelize.define("items", {
      _name: DataTypes.STRING,
      wishlistID: DataTypes.INTEGER,
      checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
      },
      checked_by: {
        type: DataTypes.STRING,
        allowNull:true,
        default: null
                  }
    });
    return items;
  };
  