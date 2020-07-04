module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Wallets', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      required: true,
      primaryKey: true
    },
    customerId: {
      type: Sequelize.UUID,
      required: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'customerId'
      }
    },
    balance: {
      type: Sequelize.DOUBLE,
      required: true,
    },
    type: {
      type: Sequelize.ENUM(['customer', 'company']),
      required: true
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Wallets')
};