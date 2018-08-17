module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
      uname: DataTypes.STRING,
      pw: DataTypes.TEXT
    });
    return users;
  };
  