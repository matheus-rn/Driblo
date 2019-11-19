module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('peladas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photo_url: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      field_type: {
        type: Sequelize.STRING,
      },
      number_goals: {
        type: Sequelize.INTEGER,
      },
      time_duration: {
        type: Sequelize.INTEGER,
      },
      players_limit: {
        type: Sequelize.INTEGER,
      },
      date_hour_pelada: {
        type: Sequelize.DATE,
      },
      quantity_players: {
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
    return queryInterface.dropTable('peladas');
  },
};
