import { prisma } from '../lib/prisma.js';

export const createTrip = (userId, data) => {
  return prisma.trip.create({
    data: {
      userId,
      waterBody: data.waterBody,
      date: data.date,
    },
  });
};

export const listTripsByUserId = (userId) => {
  return prisma.trip.findMany({
    where: { userId },
    orderBy: { id: 'asc' },
  });
};

export const findTripById = (id) => {
  return prisma.trip.findUnique({
    where: { id },
    include: {
      catches: true,
    },
  });
};

export const updateTrip = (id, data) => {
  return prisma.trip.update({
    where: { id },
    data: {
      waterBody: data.waterBody,
      date: data.date,
    },
    include: {
      catches: true,
    },
  });
};

export const deleteTrip = (id) => {
  return prisma.trip.delete({
    where: { id },
  });
};