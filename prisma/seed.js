import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

const seed = async () => {
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "catches", "trips", "fishing_spots", "users" RESTART IDENTITY CASCADE;');

  const passwordHash = await bcrypt.hash('Password123!', 12);

  const owner = await prisma.user.create({
    data: {
      email: 'owner@example.com',
      passwordHash,
    },
  });

  const guest = await prisma.user.create({
    data: {
      email: 'guest@example.com',
      passwordHash,
    },
  });

  const ownerTripOne = await prisma.trip.create({
    data: {
      userId: owner.id,
      waterBody: 'Lake Ontario',
      date: new Date('2026-04-19'),
    },
  });

  const ownerTripTwo = await prisma.trip.create({
    data: {
      userId: owner.id,
      waterBody: 'Erie Canal',
      date: new Date('2026-04-20'),
    },
  });

  const guestTrip = await prisma.trip.create({
    data: {
      userId: guest.id,
      waterBody: 'Niagara River',
      date: new Date('2026-04-21'),
    },
  });

  await prisma.catch.createMany({
    data: [
      {
        tripId: ownerTripOne.id,
        species: 'Smallmouth Bass',
        weightLbs: 4.2,
        lengthInches: 18.3,
        gender: 'male',
        timeCaught: new Date('2026-04-19T15:30:00.000Z'),
        pictureUrl: 'https://example.com/catches/bass-1.jpg',
      },
      {
        tripId: ownerTripTwo.id,
        species: 'Northern Pike',
        weightLbs: 8.9,
        lengthInches: 29.1,
        gender: null,
        timeCaught: new Date('2026-04-20T16:45:00.000Z'),
        pictureUrl: null,
      },
      {
        tripId: guestTrip.id,
        species: 'Walleye',
        weightLbs: 6.7,
        lengthInches: 24,
        gender: 'female',
        timeCaught: new Date('2026-04-21T14:15:00.000Z'),
        pictureUrl: 'https://example.com/catches/walleye-1.jpg',
      },
    ],
  });

  await prisma.fishingSpot.createMany({
    data: [
      {
        userId: owner.id,
        name: 'Owner Private Cove',
        latitude: 43.654,
        longitude: -79.383,
        isPublic: false,
      },
      {
        userId: owner.id,
        name: 'Owner Public Pier',
        latitude: 43.655,
        longitude: -79.384,
        isPublic: true,
      },
      {
        userId: guest.id,
        name: 'Guest Public Launch',
        latitude: 43.656,
        longitude: -79.385,
        isPublic: true,
      },
      {
        userId: guest.id,
        name: 'Guest Private Dock',
        latitude: 43.657,
        longitude: -79.386,
        isPublic: false,
      },
    ],
  });

  console.log('Seed complete.');
  console.log('Login credentials: owner@example.com / Password123! and guest@example.com / Password123!');
};

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });