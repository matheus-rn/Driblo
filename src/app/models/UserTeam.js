import Sequelize, { Model } from 'sequelize';

class UserTeam extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: Sequelize.INTEGER,
        teamId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default UserTeam;
