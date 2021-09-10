import Sequelize, { Model } from "sequelize"

class UserPatient extends Model {
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

      email: Sequelize.STRING,
      passwordHash: Sequelize.STRING,
      resetPasswordToken: Sequelize.STRING,
      resetPasswordTokenDate: Sequelize.DATE,
      active: Sequelize.BOOLEAN,
    },
    {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.Patient, {
      foreignKey: 'patientId',
      as: 'patient',
    });
  }
}

export default UserPatient;
