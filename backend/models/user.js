'use strict';





module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    login: {
      allowNull: false,
      type: DataTypes.STRING(30),
      unique:true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(60)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING(30)
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    admin: {
      allowNull: false,
      defaultValue:false,
      type: DataTypes.BOOLEAN
    }
  });

  User.associate = function(models) {
    models.User.hasMany(models.Equipment,{
      onDelete:'SET NULL',
      constraints:false
    })
  };

  return User;
};

