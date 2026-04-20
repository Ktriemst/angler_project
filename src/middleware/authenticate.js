import jwt from 'jsonwebtoken';

import { unauthorized } from '../lib/errors.js';

export const authenticate = (request, _response, next) => {
  const header = request.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    next(unauthorized('Missing or invalid authorization token'));
    return;
  }

  const token = header.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.user = {
      id: Number(decoded.sub),
      email: decoded.email,
    };

    next();
  } catch {
    next(unauthorized('Invalid or expired token'));
  }
};