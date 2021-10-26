'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  );
  return User;
};
