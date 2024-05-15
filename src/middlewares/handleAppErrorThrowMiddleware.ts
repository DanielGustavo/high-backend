import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

import AppError from '../shared/errors/AppError';

export default function handleAppErrorThrowMiddleware(
  error: ErrorRequestHandler,
  __: Request,
  response: Response,
  _: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.code).json({ error: error.message });
  }

  console.log(error);

  return response.status(500).json({ error: 'Internal Server Error' });
}
