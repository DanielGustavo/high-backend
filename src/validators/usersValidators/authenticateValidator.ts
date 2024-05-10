import * as yup from 'yup';

import ValidatorError from '../errors/ValidatorError';

class AuthenticateValidator {
  async validate(body: unknown) {
    const schema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required(),
    });

    await schema.validate(body).catch(({ errors }: yup.ValidationError) => {
      throw new ValidatorError(errors[0]);
    });
  }
}

export default new AuthenticateValidator();
