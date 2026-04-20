import { asyncHandler } from '../lib/async-handler.js';
import { createUserTrip, deleteUserTrip, getUserTrip, listUserTrips, updateUserTrip } from '../services/trips.service.js';

export const createTripController = asyncHandler(async (request, response) => {
  const trip = await createUserTrip(request.user.id, request.body);
  response.status(201).json(trip);
});

export const listTripsController = asyncHandler(async (request, response) => {
  const trips = await listUserTrips(request.user.id);
  response.status(200).json(trips);
});

export const getTripController = asyncHandler(async (request, response) => {
  const trip = await getUserTrip(request.user.id, request.params.id);
  response.status(200).json(trip);
});

export const updateTripController = asyncHandler(async (request, response) => {
  const trip = await updateUserTrip(request.user.id, request.params.id, request.body);
  response.status(200).json(trip);
});

export const deleteTripController = asyncHandler(async (request, response) => {
  const trip = await deleteUserTrip(request.user.id, request.params.id);
  response.status(200).json(trip);
});