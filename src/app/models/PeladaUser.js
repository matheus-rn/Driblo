import Sequelize, { Model } from 'sequelize';

class PeladaUser extends Model {
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

export default PeladaUser;
