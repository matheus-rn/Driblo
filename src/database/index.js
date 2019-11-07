import Sequelize from 'sequelize';

import User from '../app/models/User';
import Pelada from '../app/models/Pelada';
import UserPelada from '../app/models/UserPelada';
import Team from '../app/models/Team';
import Goal from '../app/models/Goal';
import databaseConfig from '../config/database';


const models = [User, Pelada, UserPelada, Team, Goal];

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
