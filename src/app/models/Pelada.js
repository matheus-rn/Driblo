import Sequelize, { Model } from 'sequelize';

class Pelada extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        location: Sequelize.STRING,
        field_type: Sequelize.STRING,
        number_goals: Sequelize.INTEGER,
        time_duration: Sequelize.INTEGER,
        date_hour_pelada: Sequelize.DATE,
        players_limit: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'pelada_users',
      as: 'users',
      foreignKey: 'peladaId',
    });
  }
}

export default Pelada;
