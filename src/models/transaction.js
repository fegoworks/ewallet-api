module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      required: true,
      primaryKey: true
    },
    accountNumber: {
      type: DataTypes.DOUBLE,
      required: true
    },
    amount: {
      type: DataTypes.DOUBLE,
      required: true,
    },
    type: {
      type: DataTypes.ENUM(['transfer', 'debit', 'funding']),
      required: true
    },
    narration: {
      type: DataTypes.STRING,
      required: true
    }
  }, {});
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Wallet, {
      foreignKey: 'accountNumber'
    });
  };
  return Transaction;
};