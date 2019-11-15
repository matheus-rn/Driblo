import Sequelize, { Model } from 'sequelize';

class Rule extends Model {
  static init(sequelize) {
    super.init(
      {
        rule: Sequelize.STRING,
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
  }
}

export default Rule;
