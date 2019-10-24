module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pelada_users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          as: 'userId',
        },
      },
      pelada_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'peladas',
          key: 'id',
          as: 'peladaId',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('pelada_users');
  },
};
