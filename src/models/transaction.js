module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    name: DataTypes.STRING
  }, {});
  Transaction.associate = function (models) {
    // associations can be defined here
  };
  return Transaction;
};