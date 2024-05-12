import * as yup from 'yup';

import ValidatorError from '../errors/ValidatorError';

class ListValidator {
  async validate(query: unknown) {
    const schema = yup.object().shape({
      search: yup.string().optional().max(5000),
      page: yup.number().min(1).required(),
      items: yup.number().optional().min(1).max(50),
    });

    await schema.validate(query).catch(({ errors }: yup.ValidationError) => {
      throw new ValidatorError(errors[0]);
    });
  }
}

export default new ListValidator();
