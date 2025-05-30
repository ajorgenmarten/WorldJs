/*
  Warnings:

  - You are about to drop the `BuildiableService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "BuildiableService_url_key";

-- DropIndex
DROP INDEX "BuildiableService_serviceId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BuildiableService";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "BuildableService" (
    "serviceId" TEXT NOT NULL,
    "folderPath" TEXT NOT NULL,
    "rootDir" TEXT,
    "buildCommand" TEXT,
    "url" TEXT,
    "envVars" JSONB,
    CONSTRAINT "BuildableService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NodejsService" (
    "buildiableServiceId" TEXT NOT NULL,
    "startCommand" TEXT NOT NULL,
    CONSTRAINT "NodejsService_buildiableServiceId_fkey" FOREIGN KEY ("buildiableServiceId") REFERENCES "BuildableService" ("serviceId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NodejsService" ("buildiableServiceId", "startCommand") SELECT "buildiableServiceId", "startCommand" FROM "NodejsService";
DROP TABLE "NodejsService";
ALTER TABLE "new_NodejsService" RENAME TO "NodejsService";
CREATE UNIQUE INDEX "NodejsService_buildiableServiceId_key" ON "NodejsService"("buildiableServiceId");
CREATE TABLE "new_StaticService" (
    "buildiableServiceId" TEXT NOT NULL,
    "publishDir" TEXT,
    CONSTRAINT "StaticService_buildiableServiceId_fkey" FOREIGN KEY ("buildiableServiceId") REFERENCES "BuildableService" ("serviceId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StaticService" ("buildiableServiceId", "publishDir") SELECT "buildiableServiceId", "publishDir" FROM "StaticService";
DROP TABLE "StaticService";
ALTER TABLE "new_StaticService" RENAME TO "StaticService";
CREATE UNIQUE INDEX "StaticService_buildiableServiceId_key" ON "StaticService"("buildiableServiceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "BuildableService_serviceId_key" ON "BuildableService"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "BuildableService_url_key" ON "BuildableService"("url");
