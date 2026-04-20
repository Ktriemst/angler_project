import { AppError } from '../lib/errors.js';

export const errorHandler = (error, _request, response, _next) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      error: error.message,
      ...(error.details ? { details: error.details } : {}),
    });
    return;
  }

  console.error(error);

  response.status(500).json({
    error: 'Internal server error',
  });
};