import { asyncHandler } from '../lib/async-handler.js';
import { createUserCatch, deleteUserCatch, getUserCatch, listUserCatches, updateUserCatch } from '../services/catches.service.js';

export const createCatchController = asyncHandler(async (request, response) => {
  const catchItem = await createUserCatch(request.user.id, request.body);
  response.status(201).json(catchItem);
});

export const listCatchesController = asyncHandler(async (request, response) => {
  const catches = await listUserCatches(request.user.id);
  response.status(200).json(catches);
});

export const getCatchController = asyncHandler(async (request, response) => {
  const catchItem = await getUserCatch(request.user.id, request.params.id);
  response.status(200).json(catchItem);
});

export const updateCatchController = asyncHandler(async (request, response) => {
  const catchItem = await updateUserCatch(request.user.id, request.params.id, request.body);
  response.status(200).json(catchItem);
});

export const deleteCatchController = asyncHandler(async (request, response) => {
  const catchItem = await deleteUserCatch(request.user.id, request.params.id);
  response.status(200).json(catchItem);
});