import * as yup from 'yup';

import ValidatorError from '../errors/ValidatorError';

class CreateValidator {
  async validate(body: unknown) {
    const schema = yup.object().shape({
      title: yup.string().min(5).max(100),
      description: yup.string().optional().max(300),
      content: yup.string().min(5).max(100000),
    });

    await schema.validate(body).catch(({ errors }: yup.ValidationError) => {
      throw new ValidatorError(errors[0]);
    });
  }
}

export default new CreateValidator();
