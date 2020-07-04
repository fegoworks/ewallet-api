module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    balance: {
      type: DataTypes.DOUBLE,
      required: true,
    },
    type: {
      type: DataTypes.ENUM(['customer', 'company']),
      required: true
    }
  }, {});
  Wallet.associate = (models) => {
    Wallet.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'customerId',
    });

    Wallet.hasMany(models.Transaction, {
      foreignKey: 'id',
      as: 'transactionId'
    });
  };
  return Wallet;
};