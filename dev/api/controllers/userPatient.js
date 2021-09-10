import * as jwt from 'jsonwebtoken';

module.exports = (app) => {
  const controller = {};
  const repository = app.repositories.userPatient;

  controller.login = async (params) => {

    const { email } = params;

    const userPatient = await repository.findByEmail(email);

    // Token de 15m
    const token = jwt.sign(
      {
        id: userPatient.id,
        email: userPatient.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    return { token };
  };

  controller.findOne = async (params) => {
    const { userPatientId } = params;

    const userPatient = await repository.findOne(userPatientId);

    return userPatient;

  };

  return controller;
};
