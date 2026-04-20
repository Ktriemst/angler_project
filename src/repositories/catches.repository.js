import { prisma } from '../lib/prisma.js';

export const createCatch = (data) => {
  return prisma.catch.create({
    data: {
      tripId: data.tripId,
      species: data.species,
      weightLbs: data.weightLbs,
      lengthInches: data.lengthInches,
      gender: data.gender,
      timeCaught: data.timeCaught,
      pictureUrl: data.pictureUrl,
    },
  });
};

export const listCatchesByUserId = (userId) => {
  return prisma.catch.findMany({
    where: {
      trip: {
        userId,
      },
    },
    include: {
      trip: true,
    },
    orderBy: { id: 'asc' },
  });
};

export const findCatchById = (id) => {
  return prisma.catch.findUnique({
    where: { id },
    include: {
      trip: true,
    },
  });
};

export const updateCatch = (id, data) => {
  return prisma.catch.update({
    where: { id },
    data: {
      species: data.species,
      weightLbs: data.weightLbs,
      lengthInches: data.lengthInches,
      gender: data.gender,
      timeCaught: data.timeCaught,
      pictureUrl: data.pictureUrl,
    },
    include: {
      trip: true,
    },
  });
};

export const deleteCatch = (id) => {
  return prisma.catch.delete({
    where: { id },
  });
};