import {
  hashPassword
} from '../helpers/utils';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      required: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      required: true
    }
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Transactions, {
      foreignKey: 'id',
      as: 'userId',
    });

    User.hasOne(models.Wallet, {
      foreignKey: 'id',
      as: 'userId'
    });

    User.beforeCreate(async (newUser) => {
      newUser.password = '' || hashPassword(newUser.password);
    });
  };
  return User;
};