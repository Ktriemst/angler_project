import { badRequest } from './errors.js';

export const parseDateOnly = (value, fieldName) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw badRequest(`Invalid ${fieldName}`);
  }

  return date;
};

export const parseDateTime = (value, fieldName) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw badRequest(`Invalid ${fieldName}`);
  }

  return date;
};

export const toIsoDate = (value) => {
  if (!value) {
    return value;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
};

export const toDateOnlyString = (value) => {
  if (!value) {
    return value;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString().slice(0, 10);
};