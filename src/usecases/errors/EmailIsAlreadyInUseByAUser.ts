import AppError from '../../shared/errors/AppError';

export default new AppError(
  400,
  'This email is already in use by an user, try another one.'
);
