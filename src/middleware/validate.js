import { badRequest } from '../lib/errors.js';

const buildValidator = (schema, source) => {
  return (request, _response, next) => {
    const result = schema.safeParse(request[source]);

    if (!result.success) {
      next(badRequest('Validation failed', result.error.flatten()));
      return;
    }

    request[source] = result.data;
    next();
  };
};

export const validateBody = (schema) => buildValidator(schema, 'body');
export const validateParams = (schema) => buildValidator(schema, 'params');