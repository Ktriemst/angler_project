import { forbidden, notFound } from '../lib/errors.js';
import { parseDateOnly } from '../lib/dates.js';
import { serializeTrip } from '../lib/formatters.js';
import { createTrip, deleteTrip, findTripById, listTripsByUserId, updateTrip } from '../repositories/trips.repository.js';

const assertTripOwnership = (trip, userId) => {
  if (!trip) {
    throw notFound('Trip not found');
  }

  if (trip.userId !== userId) {
    throw forbidden('You do not have access to this trip');
  }
};

export const createUserTrip = async (userId, payload) => {
  const trip = await createTrip(userId, {
    waterBody: payload.waterBody,
    date: parseDateOnly(payload.date, 'date'),
  });

  return serializeTrip(trip);
};

export const listUserTrips = async (userId) => {
  const trips = await listTripsByUserId(userId);
  return trips.map((trip) => serializeTrip(trip));
};

export const getUserTrip = async (userId, tripId) => {
  const trip = await findTripById(tripId);
  assertTripOwnership(trip, userId);
  return serializeTrip(trip);
};

export const updateUserTrip = async (userId, tripId, payload) => {
  const trip = await findTripById(tripId);
  assertTripOwnership(trip, userId);

  const updatedTrip = await updateTrip(tripId, {
    waterBody: payload.waterBody,
    date: parseDateOnly(payload.date, 'date'),
  });

  return serializeTrip(updatedTrip);
};

export const deleteUserTrip = async (userId, tripId) => {
  const trip = await findTripById(tripId);
  assertTripOwnership(trip, userId);

  await deleteTrip(tripId);

  return serializeTrip(trip);
};