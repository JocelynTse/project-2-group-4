module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define("users", {
    uname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 25]
      }
    },

    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });
  return users;
};