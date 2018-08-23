module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
      indexes: [
        {
          unique: true,
          fields: ['uname']
        }
      ],
      uname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 25]
        }
      },
      pw: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [8, 50]
        }
      }
    });
    return users;
  };
  