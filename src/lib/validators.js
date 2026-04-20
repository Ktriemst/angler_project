import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const signupSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(128),
});

export const loginSchema = signupSchema;

export const tripSchema = z.object({
  waterBody: z.string().trim().min(1).max(255),
  date: z.string().trim().min(1),
});

export const catchSchema = z.object({
  tripId: z.coerce.number().int().positive(),
  species: z.string().trim().min(1).max(255),
  weightLbs: z.coerce.number().positive(),
  lengthInches: z.coerce.number().positive(),
  gender: z.string().trim().max(100).nullable().optional(),
  timeCaught: z.string().trim().min(1),
  pictureUrl: z.string().trim().max(2048).nullable().optional(),
});

export const spotSchema = z.object({
  name: z.string().trim().min(1).max(255),
  latitude: z.coerce.number().finite(),
  longitude: z.coerce.number().finite(),
  isPublic: z.coerce.boolean().optional().default(false),
});