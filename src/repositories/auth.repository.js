import { prisma } from '../lib/prisma.js';

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = (email, passwordHash) => {
  return prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });
};