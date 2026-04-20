CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "trips" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "water_body" TEXT NOT NULL,
    "date" DATE NOT NULL,
    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "catches" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "species" TEXT NOT NULL,
    "weight_lbs" DOUBLE PRECISION NOT NULL,
    "length_inches" DOUBLE PRECISION NOT NULL,
    "gender" TEXT,
    "time_caught" TIMESTAMP(3) NOT NULL,
    "picture_url" TEXT,
    CONSTRAINT "catches_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "fishing_spots" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "fishing_spots_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

ALTER TABLE "trips" ADD CONSTRAINT "trips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "catches" ADD CONSTRAINT "catches_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "fishing_spots" ADD CONSTRAINT "fishing_spots_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;