import * as yup from 'yup';

import ValidatorError from '../errors/ValidatorError';

class RegisterValidator {
  async validate(body: unknown) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      name: yup.string().min(5).max(100).required(),
      password: yup.string().min(10).max(800).required(),
    });

    await schema
      .validate(body, { abortEarly: true })
      .catch(({ errors }: yup.ValidationError) => {
        throw new ValidatorError(errors[0]);
      });
  }
}

export default new RegisterValidator();
