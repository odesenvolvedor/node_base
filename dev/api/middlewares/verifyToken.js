/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      throw new Error();
    }

    const [, token] = authHeader.split(' ');
    const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    if (!id) {
      throw new Error();
    }

    req.params.associatedId = id;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).send();
  }
};
