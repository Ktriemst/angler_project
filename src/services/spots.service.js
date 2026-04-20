import { forbidden, notFound } from '../lib/errors.js';
import { serializeSpot } from '../lib/formatters.js';
import { createSpot, deleteSpot, findSpotById, listVisibleSpotsByUserId, updateSpot } from '../repositories/spots.repository.js';

const assertSpotVisibility = (spot, userId) => {
  if (!spot) {
    throw notFound('Fishing spot not found');
  }

  if (spot.userId !== userId && !spot.isPublic) {
    throw forbidden('You do not have access to this fishing spot');
  }
};

const assertSpotOwnership = (spot, userId) => {
  if (!spot) {
    throw notFound('Fishing spot not found');
  }

  if (spot.userId !== userId) {
    throw forbidden('You do not own this fishing spot');
  }
};

export const createUserSpot = async (userId, payload) => {
  const spot = await createSpot(userId, payload);
  return serializeSpot(spot);
};

export const listUserSpots = async (userId) => {
  const spots = await listVisibleSpotsByUserId(userId);
  return spots.map((spot) => serializeSpot(spot));
};

export const getUserSpot = async (userId, spotId) => {
  const spot = await findSpotById(spotId);
  assertSpotVisibility(spot, userId);
  return serializeSpot(spot);
};

export const updateUserSpot = async (userId, spotId, payload) => {
  const spot = await findSpotById(spotId);
  assertSpotOwnership(spot, userId);

  const updatedSpot = await updateSpot(spotId, payload);
  return serializeSpot(updatedSpot);
};

export const deleteUserSpot = async (userId, spotId) => {
  const spot = await findSpotById(spotId);
  assertSpotOwnership(spot, userId);

  await deleteSpot(spotId);

  return serializeSpot(spot);
};