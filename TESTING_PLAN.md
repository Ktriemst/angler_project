# Swagger UI Testing Plan

Use Swagger UI at `/api-docs`. Before testing protected routes, log in with one of the seeded users and click **Authorize**.

Seeded data after `npm run seed`:

- User 1: `owner@example.com` / `Password123!`
- User 2: `guest@example.com` / `Password123!`
- Trips: `1`, `2` belong to user 1; `3` belongs to user 2
- Catches: `1`, `2` belong to user 1; `3` belongs to user 2
- Spots: `1` private owner spot, `2` public owner spot, `3` public guest spot, `4` private guest spot

## Authentication

### `POST /api/auth/signup`

- Access: Public
- Success:
  - Click **Try it out**
  - Send a unique email and a password of at least 8 characters
  - Expect `201 Created`
- Error cases:
  - `400 Bad Request`: remove `email` or `password`, or enter an invalid email format
  - `409 Conflict`: try `owner@example.com` again

### `POST /api/auth/login`

- Access: Public
- Success:
  - Click **Try it out**
  - Use `owner@example.com` / `Password123!`
  - Expect `200 OK` with a JWT
- Error cases:
  - `400 Bad Request`: remove `email` or `password`
  - `401 Unauthorized`: use the wrong password or a non-existent email

## Trips

### `POST /api/trips`

- Access: Authenticated user only
- Setup:
  - Log in with `owner@example.com` / `Password123!`
  - Copy the JWT into **Authorize**
- Success:
  - Send `{"waterBody":"St. Lawrence River","date":"2026-04-22"}`
  - Expect `201 Created`
- Error cases:
  - `400 Bad Request`: remove `waterBody` or send an invalid date
  - `401 Unauthorized`: remove the JWT from Swagger UI

### `GET /api/trips`

- Access: Authenticated user only
- Success:
  - Expect only trips owned by the logged-in user
  - As owner, expect trips `1` and `2`
- Error cases:
  - `401 Unauthorized`: remove the JWT

### `GET /api/trips/:id`

- Access: Owner only
- Success:
  - Use `1` and expect trip `1`
- Error cases:
  - `400 Bad Request`: use `-1`
  - `401 Unauthorized`: remove the JWT
  - `403 Forbidden`: log in as `guest@example.com` and request trip `1`
  - `404 Not Found`: use `9999`

### `PUT /api/trips/:id`

- Access: Owner only
- Success:
  - Update trip `1` with `{"waterBody":"Updated River","date":"2026-04-23"}`
  - Expect `200 OK`
- Error cases:
  - `400 Bad Request`: remove `date`
  - `401 Unauthorized`: remove the JWT
  - `403 Forbidden`: use trip `3` while logged in as owner
  - `404 Not Found`: use `9999`

### `DELETE /api/trips/:id`

- Access: Owner only
- Success:
  - Delete trip `2` as the owner
  - Expect `200 OK`
- Error cases:
  - `400 Bad Request`: use `-1`
  - `401 Unauthorized`: remove the JWT
  - `403 Forbidden`: use trip `3` while logged in as owner
  - `404 Not Found`: use `9999`

## Catches

### `POST /api/catches`

- Access: Authenticated user only
- Setup:
  - Log in as the owner
  - Use trip `1` or `2`
- Success:
  - Send a body like `{"tripId":1,"species":"Largemouth Bass","weightLbs":5.2,"lengthInches":20.1,"gender":"male","timeCaught":"2026-04-22T15:00:00.000Z","pictureUrl":"https://example.com/catch.jpg"}`
  - Expect `201 Created`
- Error cases:
  - `400 Bad Request`: remove `species` or `timeCaught`
  - `401 Unauthorized`: remove the JWT
  - `403 Forbidden`: use trip `3` while logged in as the owner
  - `404 Not Found`: use trip `9999`

### `GET /api/catches`

- Access: Authenticated user only
- Success:
  - As owner, expect catches `1` and `2`
  - As guest, expect catch `3`
- Error cases:
  - `401 Unauthorized`: remove the JWT

### `GET /api/catches/:id`

- Access: Owner only
- Success:
  - Use `1` as the owner and expect that catch
- Error cases:
  - `400 Bad Request`: use `-1`
  - `401 Unauthorized`: remove the JWT
  - `403 Forbidden`: request catch `3` while logged in as the owner
  - `404 Not Found`: use `9999`

### `PUT /api/catches/:id`

- Access: Owner only
- Success:
  - Update catch `1` with a larger weight or a different species
  - Expect `200 OK`
- Error cases:
  - `400 Bad Request`: remove `species` or use an invalid `timeCaught`
  - `401 Unauthorized`: remove the JWT
  - `403 Forbidden`: try to update catch `3` while logged in as the owner
  - `404 Not Found`: use `9999`

### `DELETE /api/catches/:id`

- Access: Owner only
- Success:
  - Delete catch `2` as the owner
  - Expect `200 OK`
- Error cases:
  - `400 Bad Request`: use `-1`
  - `401 Unauthorized`: remove the JWT
  - `403 Forbidden`: try to delete catch `3` while logged in as the owner
  - `404 Not Found`: use `9999`

## Fishing Spots

### `POST /api/spots`

- Access: Authenticated user only
- Success:
  - Send `{"name":"Cliffside Point","latitude":43.658,"longitude":-79.387,"isPublic":true}`
  - Expect `201 Created`
- Error cases:
  - `400 Bad Request`: remove `name` or send a non-numeric latitude
  - `401 Unauthorized`: remove the JWT

### `GET /api/spots`

- Access: Authenticated user only
- Success:
  - As owner, expect spots `1`, `2`, and `3`
  - As guest, expect spots `2`, `3`, and `4`
  - Confirm private spots owned by the other user are not included
- Error cases:
  - `401 Unauthorized`: remove the JWT

### `GET /api/spots/:id`

- Access: Owner or public spot access
- Success:
  - As either user, request spot `2` and expect `200 OK`
  - As owner, request spot `1` and expect `200 OK`
- Error cases:
  - `400 Bad Request`: use `-1`
  - `401 Unauthorized`: remove the JWT
  - `403 Forbidden`: log in as guest and request spot `1`
  - `404 Not Found`: use `9999`

### `PUT /api/spots/:id`

- Access: Owner only
- Success:
  - Update spot `1` as the owner
  - Expect `200 OK`
- Error cases:
  - `400 Bad Request`: remove `latitude`
  - `401 Unauthorized`: remove the JWT
  - `403 Forbidden`: log in as guest and try to update spot `2`
  - `404 Not Found`: use `9999`

### `DELETE /api/spots/:id`

- Access: Owner only
- Success:
  - Delete spot `1` as the owner
  - Expect `200 OK`
- Error cases:
  - `400 Bad Request`: use `-1`
  - `401 Unauthorized`: remove the JWT
  - `403 Forbidden`: log in as guest and try to delete spot `2`
  - `404 Not Found`: use `9999`

## Swagger Authorization Steps

1. Call `POST /api/auth/login`.
2. Copy the returned `accessToken`.
3. Click **Authorize** in Swagger UI.
4. Paste `Bearer <token>`.
5. Run the protected endpoints.
