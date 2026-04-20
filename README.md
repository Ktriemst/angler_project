# Angler Logbook API

REST API for tracking fishing trips, catches, and fishing spots with JWT authentication, Prisma, PostgreSQL, and Swagger UI.

## Stack

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT authentication with bcrypt password hashing

## Local Setup

1. Install dependencies with `npm install`.
2. Set `DATABASE_URL`, `JWT_SECRET`, and `PORT` in `.env`.
3. Run the database migration with `npm run db:migrate` or `npm run db:deploy`.
4. Seed the database with `npm run seed`.
5. Start the API with `npm run dev`.

## Docs

- Swagger UI: `/api-docs`
- OpenAPI JSON: `/api-docs.json`
- Health check: `/health`

## Seeded Credentials

- `owner@example.com` / `Password123!`
- `guest@example.com` / `Password123!`

## Main Resources

- Trips: `/api/trips`
- Catches: `/api/catches`
- Fishing spots: `/api/spots`

## Notes

- All protected endpoints require `Authorization: Bearer <token>`.
- Fishing spots are public only when `isPublic` is true.
- Catch creation validates that the selected trip belongs to the logged-in user.
