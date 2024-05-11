import { NextFunction, Request, Response } from 'express';

import AppError from '../shared/errors/AppError';

import { makeJWTHelper } from '../helpers/factories/TokenHelper';

export default function ensureAuthorizationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;

  if (!auth) {
    throw new AppError(401, 'Token was not provided');
  }

  const [, token] = auth.split('Bearer ');

  if (!token) {
    throw new AppError(401, 'Invalid token');
  }

  const tokenHelper = makeJWTHelper();
  const tokenIsValid = tokenHelper.validate(token);

  if (tokenIsValid) {
    next();
  } else {
    throw new AppError(401, 'Invalid token');
  }
}
