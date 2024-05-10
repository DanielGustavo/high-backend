import AppError from '../../shared/errors/AppError';

export default class ValidatorError extends AppError {
  constructor(error: string) {
    super(400, error);
  }
}
