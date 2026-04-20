import { prisma } from '../lib/prisma.js';

export const createSpot = (userId, data) => {
  return prisma.fishingSpot.create({
    data: {
      userId,
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      isPublic: data.isPublic,
    },
  });
};

export const listVisibleSpotsByUserId = (userId) => {
  return prisma.fishingSpot.findMany({
    where: {
      OR: [{ userId }, { isPublic: true }],
    },
    orderBy: { id: 'asc' },
  });
};

export const findSpotById = (id) => {
  return prisma.fishingSpot.findUnique({
    where: { id },
  });
};

export const updateSpot = (id, data) => {
  return prisma.fishingSpot.update({
    where: { id },
    data: {
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      isPublic: data.isPublic,
    },
  });
};

export const deleteSpot = (id) => {
  return prisma.fishingSpot.delete({
    where: { id },
  });
};