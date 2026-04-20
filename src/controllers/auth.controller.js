import { asyncHandler } from '../lib/async-handler.js';
import { login, signup } from '../services/auth.service.js';

export const signupController = asyncHandler(async (request, response) => {
  const result = await signup(request.body);

  response.status(201).json(result);
});

export const loginController = asyncHandler(async (request, response) => {
  const result = await login(request.body);

  response.status(200).json(result);
});