module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_peladas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          as: 'userId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      pelada_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'peladas',
          key: 'id',
          as: 'peladaId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_present: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      victories: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      defeat: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      goals: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      assistances: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    return queryInterface.dropTable('user_peladas');
  },
};
