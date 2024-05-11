import * as yup from 'yup';

import ValidatorError from '../errors/ValidatorError';

class UpdateValidator {
  async validate(params: unknown, body: unknown) {
    const bodySchema = yup.object().shape({
      title: yup.string().optional().min(5).max(100),
      description: yup.string().optional().max(300),
      content: yup.string().optional().min(5).max(10000),
    });

    const paramsSchema = yup.object().shape({
      postId: yup.string().uuid(),
    });

    await bodySchema.validate(body).catch(({ errors }: yup.ValidationError) => {
      throw new ValidatorError(errors[0]);
    });

    await paramsSchema
      .validate(params)
      .catch(({ errors }: yup.ValidationError) => {
        throw new ValidatorError(errors[0]);
      });
  }
}

export default new UpdateValidator();
