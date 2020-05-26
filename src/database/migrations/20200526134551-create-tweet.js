export const up = (queryInterface, Sequelize) => queryInterface.createTable('tweets', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  userId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  },
  tweet: {
    allowNull: false,
    type: Sequelize.STRING(140),
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  deletedAt: {
    allowNull: true,
    type: Sequelize.DATE,
  },
});

export const down = (queryInterface) => queryInterface.dropTable('tweets');
