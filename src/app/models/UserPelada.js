import Sequelize, { Model } from 'sequelize';

class UserPelada extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: Sequelize.INTEGER,
        peladaId: Sequelize.INTEGER,
        userPresent: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default UserPelada;
