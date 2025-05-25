/*
  Warnings:

  - The primary key for the `StaticService` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `buildCommand` on the `StaticService` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `StaticService` table. All the data in the column will be lost.
  - You are about to drop the column `envVars` on the `StaticService` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `StaticService` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `StaticService` table. All the data in the column will be lost.
  - You are about to drop the column `port` on the `StaticService` table. All the data in the column will be lost.
  - You are about to drop the column `projectPath` on the `StaticService` table. All the data in the column will be lost.
  - You are about to drop the column `rootDir` on the `StaticService` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `StaticService` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `StaticService` table. All the data in the column will be lost.
  - Added the required column `buildiableServiceId` to the `StaticService` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "port" INTEGER NOT NULL DEFAULT 80,
    "exposed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BuildiableService" (
    "serviceId" TEXT NOT NULL,
    "folderPath" TEXT NOT NULL,
    "rootDir" TEXT,
    "buildCommand" TEXT,
    "url" TEXT,
    "envVars" JSONB
);

-- CreateTable
CREATE TABLE "PostgresService" (
    "serviceId" TEXT NOT NULL,
    "user" TEXT NOT NULL DEFAULT 'postgres',
    "password" TEXT NOT NULL,
    "database" TEXT
);

-- CreateTable
CREATE TABLE "NodejsService" (
    "buildiableServiceId" TEXT NOT NULL,
    "startCommand" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StaticService" (
    "buildiableServiceId" TEXT NOT NULL,
    "publishDir" TEXT
);
INSERT INTO "new_StaticService" ("publishDir") SELECT "publishDir" FROM "StaticService";
DROP TABLE "StaticService";
ALTER TABLE "new_StaticService" RENAME TO "StaticService";
CREATE UNIQUE INDEX "StaticService_buildiableServiceId_key" ON "StaticService"("buildiableServiceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BuildiableService_serviceId_key" ON "BuildiableService"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "BuildiableService_url_key" ON "BuildiableService"("url");

-- CreateIndex
CREATE UNIQUE INDEX "PostgresService_serviceId_key" ON "PostgresService"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "NodejsService_buildiableServiceId_key" ON "NodejsService"("buildiableServiceId");
