import { forbidden, notFound } from '../lib/errors.js';
import { parseDateTime } from '../lib/dates.js';
import { serializeCatch } from '../lib/formatters.js';
import { createCatch, deleteCatch, findCatchById, listCatchesByUserId, updateCatch } from '../repositories/catches.repository.js';
import { prisma } from '../lib/prisma.js';

const assertCatchOwnership = (catchItem, userId) => {
  if (!catchItem) {
    throw notFound('Catch not found');
  }

  if (catchItem.trip.userId !== userId) {
    throw forbidden('You do not have access to this catch');
  }
};

const ensureTripOwnedByUser = async (tripId, userId) => {
  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!trip) {
    throw notFound('Trip not found');
  }

  if (trip.userId !== userId) {
    throw forbidden('You cannot create a catch for another user\'s trip');
  }

  return trip;
};

export const createUserCatch = async (userId, payload) => {
  await ensureTripOwnedByUser(payload.tripId, userId);

  const catchItem = await createCatch({
    tripId: payload.tripId,
    species: payload.species,
    weightLbs: payload.weightLbs,
    lengthInches: payload.lengthInches,
    gender: payload.gender,
    timeCaught: parseDateTime(payload.timeCaught, 'timeCaught'),
    pictureUrl: payload.pictureUrl,
  });

  return serializeCatch(catchItem);
};

export const listUserCatches = async (userId) => {
  const catches = await listCatchesByUserId(userId);
  return catches.map((catchItem) => serializeCatch(catchItem));
};

export const getUserCatch = async (userId, catchId) => {
  const catchItem = await findCatchById(catchId);
  assertCatchOwnership(catchItem, userId);
  return serializeCatch(catchItem);
};

export const updateUserCatch = async (userId, catchId, payload) => {
  const catchItem = await findCatchById(catchId);
  assertCatchOwnership(catchItem, userId);

  const updatedCatch = await updateCatch(catchId, {
    species: payload.species,
    weightLbs: payload.weightLbs,
    lengthInches: payload.lengthInches,
    gender: payload.gender,
    timeCaught: parseDateTime(payload.timeCaught, 'timeCaught'),
    pictureUrl: payload.pictureUrl,
  });

  return serializeCatch(updatedCatch);
};

export const deleteUserCatch = async (userId, catchId) => {
  const catchItem = await findCatchById(catchId);
  assertCatchOwnership(catchItem, userId);

  await deleteCatch(catchId);

  return serializeCatch(catchItem);
};