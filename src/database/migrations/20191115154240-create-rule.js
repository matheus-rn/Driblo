module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rules', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      rule: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('rules');
  },
};
