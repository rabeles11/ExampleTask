CREATE TABLE IF NOT EXISTS "Estates" (
    "id" VARCHAR(10) PRIMARY KEY NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "imageURLs" VARCHAR(5000) NOT NULL,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);