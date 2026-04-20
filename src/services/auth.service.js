import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { conflict, unauthorized } from '../lib/errors.js';
import { serializeUser } from '../lib/formatters.js';
import { createUser, findUserByEmail } from '../repositories/auth.repository.js';

const createAccessToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      subject: String(user.id),
      expiresIn: '7d',
    },
  );
};

export const signup = async ({ email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw conflict('Email already exists');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await createUser(email, passwordHash);

  return {
    user: serializeUser(user),
    accessToken: createAccessToken(user),
  };
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw unauthorized('Invalid email or password');
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw unauthorized('Invalid email or password');
  }

  return {
    user: serializeUser(user),
    accessToken: createAccessToken(user),
  };
};