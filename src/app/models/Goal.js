import Sequelize, { Model } from 'sequelize';

class Goal extends Model {
  static init(sequelize) {
    super.init(
      {
        goalscorerId: Sequelize.INTEGER,
        assistantId: Sequelize.INTEGER,
        teamId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
        as: 'goalscorer',
        foreignKey: 'goalscorerId'
    });
    this.belongsTo(models.User, {
      as: 'assistant',
      foreignKey: 'assistantId'
  });
    this.belongsTo(models.Team, {
      as: 'team',
      foreignKey: 'teamId'
  });
  }
}

export default Goal;