import { toDateOnlyString, toIsoDate } from './dates.js';

export const serializeUser = (user) => ({
  id: user.id,
  email: user.email,
});

export const serializeTrip = (trip) => ({
  id: trip.id,
  userId: trip.userId,
  waterBody: trip.waterBody,
  date: toDateOnlyString(trip.date),
  catches: Array.isArray(trip.catches)
    ? trip.catches.map((catchItem) => serializeCatch(catchItem))
    : undefined,
});

export const serializeCatch = (catchItem) => ({
  id: catchItem.id,
  tripId: catchItem.tripId,
  species: catchItem.species,
  weightLbs: catchItem.weightLbs,
  lengthInches: catchItem.lengthInches,
  gender: catchItem.gender,
  timeCaught: toIsoDate(catchItem.timeCaught),
  pictureUrl: catchItem.pictureUrl,
});

export const serializeSpot = (spot) => ({
  id: spot.id,
  userId: spot.userId,
  name: spot.name,
  latitude: spot.latitude,
  longitude: spot.longitude,
  isPublic: spot.isPublic,
});