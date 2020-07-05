module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Transactions', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      unique: true,
    },
    accountNumber: {
      type: Sequelize.DOUBLE,
      required: true,
    },
    amount: {
      type: Sequelize.DOUBLE,
      required: true,
    },
    type: {
      type: Sequelize.ENUM(['transfer', 'debit', 'funding']),
      required: true
    },
    narration: {
      type: Sequelize.STRING,
      required: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Transactions')
};