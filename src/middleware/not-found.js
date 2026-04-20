import { notFound } from '../lib/errors.js';

export const notFoundHandler = (_request, _response, next) => {
  next(notFound('Route not found'));
};