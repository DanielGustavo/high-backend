import * as yup from 'yup';

import ValidatorError from '../errors/ValidatorError';

class FindOneValidator {
  async validate(params: unknown) {
    const schema = yup.object().shape({
      postId: yup.string().uuid(),
    });

    await schema.validate(params).catch(({ errors }: yup.ValidationError) => {
      throw new ValidatorError(errors[0]);
    });
  }
}

export default new FindOneValidator();
