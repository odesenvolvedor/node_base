import FieldMessage from '../exceptions/fieldmessage';
import * as yup from 'yup';
import UserPatient from '../models/UserPatient';
import bcrypt from 'bcrypt';
import UserPatient from '../models/UserPatient';

const idValid = (id) => !(Number.isNaN(id)) && Number.isInteger(+id) && typeof id !== 'object';

module.exports = (app) => {
  const validations = {};
  const validatonVerifyErrors = app.validations._verifyErrors;

  const repository = app.repositories.userPatient;

  validations.findOne = async (params) => {
    const { userPatientId } = params;
    const errors = [];

    const userPatient = await repository.findOne(userPatientId);

    if (!userPatient) {
      errors.push(new FieldMessage('userPatient', 'Não foi possível encontrar o paciente'));
      await validatonVerifyErrors.verifyErrors(errors);
    }

    // Ao final sempre chamar esse método
    await validatonVerifyErrors.verifyErrors(errors);
  };

  validations.login = async (params) => {
    const errors = [];
    const { email, password } = params

    const userPatientSchema = yup.object().shape({
      email: yup
        .string()
        .required("Campo Obrigatório"),
      password: yup
        .string()
        .required("Campo Obrigatório")
    });

    try {
      await userPatientSchema.validate(params, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push(new FieldMessage(error.path, error.message));
      });
      await validatonVerifyErrors.verifyErrors(errors);
    }

    const userPatient = await repository.findByEmail(email);

    if (!userPatient) {
      errors.push(new FieldMessage('auth', 'login e/ou senha inválidos'));
      await validatonVerifyErrors.verifyErrors(errors);
    }


    if (!bcrypt.compareSync(password, userPatient.passwordHash)) {
      errors.push(new FieldMessage('auth', 'login e/ou senha inválidos'));
      await validatonVerifyErrors.verifyErrors(errors);
    }

    if (!userPatient.active) {
      errors.push(new FieldMessage('auth', 'Paciente inativo'));
      await validatonVerifyErrors.verifyErrors(errors);
    }

    await validatonVerifyErrors.verifyErrors(errors);
  };

  return validations;
};
