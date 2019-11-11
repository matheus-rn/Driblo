import Sequelize, { Model } from 'sequelize';

class Team extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        peladaId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Pelada, {
      as: 'pelada',
      foreignKey: 'peladaId',
    });
    this.hasMany(models.Goal, {
      as: 'goals',
      foreignKey: 'teamId',
    });
  }
}

export default Team;
