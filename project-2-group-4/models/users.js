module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {

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
      },
      email:{
        type: DataTypes.TEXT,
        allowNull:false,
        validate:{isEmail:true}
      }
    });
    return users;
  };
  