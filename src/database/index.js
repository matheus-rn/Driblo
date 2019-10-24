import Sequelize from 'sequelize';

import User from '../app/models/User';
import Pelada from '../app/models/Pelada';
import PeladaUser from '../app/models/PeladaUser';
import databaseConfig from '../config/database';

const models = [User, Pelada, PeladaUser];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
