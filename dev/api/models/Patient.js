import Sequelize, { Model } from "sequelize"

class Patient extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get() {
          return String(this.getDataValue('id'));
        },
      },
      name: Sequelize.STRING,
    },
    {
      sequelize
    })
  }

  static associate(models) {
    this.hasOne(models.UserPatient, {
      foreignKey: 'patientId',
      as: 'userPatient',
    });
  }
}

export default Patient;
