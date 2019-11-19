import Sequelize, { Model } from 'sequelize';

class UserPelada extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: Sequelize.INTEGER,
        peladaId: Sequelize.INTEGER,
        userPresent: Sequelize.BOOLEAN,
        score: Sequelize.FLOAT,
        goals: Sequelize.INTEGER,
        victories: Sequelize.INTEGER,
        assistances: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default UserPelada;
