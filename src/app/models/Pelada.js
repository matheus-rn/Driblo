import Sequelize, { Model } from 'sequelize';

class Pelada extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        photoUrl: Sequelize.STRING,
        location: Sequelize.STRING,
        fieldType: Sequelize.STRING,
        numberGoals: Sequelize.INTEGER,
        timeDuration: Sequelize.INTEGER,
        dateHourPelada: Sequelize.DATE,
        playersLimit: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'user_peladas',
      as: 'users',
      foreignKey: 'peladaId',
    });
    this.hasMany(models.Team, {
      as: 'teams',
      foreignKey: 'peladaId',
    });
    this.hasMany(models.Rule, {
      as: 'rule',
      foreignKey: 'peladaId',
    });
  }
}

export default Pelada;
