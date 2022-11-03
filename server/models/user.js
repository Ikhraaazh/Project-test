'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Username required"},
        notEmpty: {msg: "Username required"}
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {msg: "Email already taken"},
      allowNull: false,
      validate: {
        notNull: {msg: "Email required"},
        notEmpty: {msg: "Email required"},
        isEmail: {msg: "Required the right email format"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Password required"},
        notEmpty: {msg: "Password required"}
      }
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Job name required"},
        notEmpty: {msg: "Job name required"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password)
  })
  return User;
};