import Sequelize from 'sequelize';
import Patient from '../api/models/Patient';
import UserPatient from '../api/models/UserPatient';

import databaseConfig from '../config/database';

const models = [
  Patient,
  UserPatient
];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach((model) => {
      model.init(this.connection);
    });

    models.forEach((model) => {
      model.associate && model.associate(this.connection.models);
    });
  }
}

export default new DataBase();
