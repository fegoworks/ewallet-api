module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Fundings', {
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
    amount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    reference: {
      type: Sequelize.STRING,
      allowNull: false,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Fundings')
};