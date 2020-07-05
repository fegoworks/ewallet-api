module.exports = (sequelize, DataTypes) => {
  const Funding = sequelize.define('Funding', {
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
    amount: {
      type: DataTypes.DOUBLE,
      required: true,
    },
    reference: {
      type: DataTypes.STRING,
      required: true,
    },
  }, {});
  Funding.associate = (models) => {
    Funding.belongsTo(models.User, {
      foreignKey: 'customerId',
    });
  };
  return Funding;
};