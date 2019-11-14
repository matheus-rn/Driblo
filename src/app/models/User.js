import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        photoUrl: Sequelize.STRING,
        goals: Sequelize.INTEGER,
        victories: Sequelize.INTEGER,
        assistances: Sequelize.INTEGER,
        score: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Pelada, {
      through: 'user_peladas',
      as: 'peladas',
      foreignKey: 'userId',
    });
    this.hasMany(models.Goal, {
      as: 'goals',
      foreignKey: 'goalscorerId',
    });
    this.hasMany(models.Goal, {
      as: 'assistance',
      foreignKey: 'goalassistantId',
    });
  }
}

export default User;
