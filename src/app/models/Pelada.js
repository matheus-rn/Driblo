import Sequelize, { Model } from 'sequelize';

class Pelada extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'PeladaUsers',
      as: 'peladas',
      foreignKey: 'peladaId',
    });
  }
}

export default Pelada;
