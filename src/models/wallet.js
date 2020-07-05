module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      required: true,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.UUID,
      required: true
    },
    accountNumber: {
      type: DataTypes.DOUBLE,
      required: true,
      unique: true
    },
    balance: {
      type: DataTypes.DOUBLE,
      required: true,
    },
    type: {
      type: DataTypes.ENUM(['customer', 'company']),
      required: true,
      defaultValue: 'customer'
    }
  }, {});
  Wallet.associate = (models) => {
    Wallet.belongsTo(models.User, {
      foreignKey: 'customerId'
    });

    Wallet.hasMany(models.Transaction, {
      foreignKey: 'accountNumber',
    });
  };
  return Wallet;
};