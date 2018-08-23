module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
      uname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {

        }
      },
      pw: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {

        }
      }
    });
    return users;
  };
  