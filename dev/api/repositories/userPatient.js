import Patient from '../models/Patient';
import UserPatient from '../models/UserPatient';

module.exports = () => {
  const repository = {};

  repository.findByEmail = async (email) => {

    const userPatient = await UserPatient.findOne({
      where: { email },
    });

    return userPatient;

  }

  repository.findOne = async (id) => {
    const userPatient = await UserPatient.findOne({
      attributes: [ 'email' ],
      where: { id },
      include: [
        {
          model: Patient,
          as: 'patient',
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        },
      ],
    });

    return userPatient;
  }

  return repository;
}
