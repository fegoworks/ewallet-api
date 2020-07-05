module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Wallets', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    customerId: {
      type: Sequelize.UUID,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'customerId'
      }
    },
    accountNumber: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      unique: true
    },
    balance: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM(['customer', 'company']),
      allowNull: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Wallets')
};