
import ErrorsException from '../exceptions/error';

module.exports = () => {
  const validation = {};

  validation.verifyErrors = async (errors = []) => {
    if (errors.length > 0) {
      throw new ErrorsException(errors);
    }
  };

  return validation
}