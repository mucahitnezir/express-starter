export const up = (queryInterface, Sequelize) => queryInterface.addColumn('users', 'deletedAt', {
  allowNull: true,
  type: Sequelize.DATE,
});

export const down = (queryInterface) => queryInterface.removeColumn('users', 'deletedAt');
