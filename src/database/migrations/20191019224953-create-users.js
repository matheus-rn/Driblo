module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photo_url: {
        type: Sequelize.STRING,
      },
      goals: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      victories: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      assistances: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      score: {
        allowNull: true,
        type: Sequelize.FLOAT,
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
    return queryInterface.dropTable('users');
  },
};
