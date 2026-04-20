import { asyncHandler } from '../lib/async-handler.js';
import { createUserSpot, deleteUserSpot, getUserSpot, listUserSpots, updateUserSpot } from '../services/spots.service.js';

export const createSpotController = asyncHandler(async (request, response) => {
  const spot = await createUserSpot(request.user.id, request.body);
  response.status(201).json(spot);
});

export const listSpotsController = asyncHandler(async (request, response) => {
  const spots = await listUserSpots(request.user.id);
  response.status(200).json(spots);
});

export const getSpotController = asyncHandler(async (request, response) => {
  const spot = await getUserSpot(request.user.id, request.params.id);
  response.status(200).json(spot);
});

export const updateSpotController = asyncHandler(async (request, response) => {
  const spot = await updateUserSpot(request.user.id, request.params.id, request.body);
  response.status(200).json(spot);
});

export const deleteSpotController = asyncHandler(async (request, response) => {
  const spot = await deleteUserSpot(request.user.id, request.params.id);
  response.status(200).json(spot);
});