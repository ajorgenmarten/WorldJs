-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BuildiableService" (
    "serviceId" TEXT NOT NULL,
    "folderPath" TEXT NOT NULL,
    "rootDir" TEXT,
    "buildCommand" TEXT,
    "url" TEXT,
    "envVars" JSONB,
    CONSTRAINT "BuildiableService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BuildiableService" ("buildCommand", "envVars", "folderPath", "rootDir", "serviceId", "url") SELECT "buildCommand", "envVars", "folderPath", "rootDir", "serviceId", "url" FROM "BuildiableService";
DROP TABLE "BuildiableService";
ALTER TABLE "new_BuildiableService" RENAME TO "BuildiableService";
CREATE UNIQUE INDEX "BuildiableService_serviceId_key" ON "BuildiableService"("serviceId");
CREATE UNIQUE INDEX "BuildiableService_url_key" ON "BuildiableService"("url");
CREATE TABLE "new_NodejsService" (
    "buildiableServiceId" TEXT NOT NULL,
    "startCommand" TEXT NOT NULL,
    CONSTRAINT "NodejsService_buildiableServiceId_fkey" FOREIGN KEY ("buildiableServiceId") REFERENCES "BuildiableService" ("serviceId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NodejsService" ("buildiableServiceId", "startCommand") SELECT "buildiableServiceId", "startCommand" FROM "NodejsService";
DROP TABLE "NodejsService";
ALTER TABLE "new_NodejsService" RENAME TO "NodejsService";
CREATE UNIQUE INDEX "NodejsService_buildiableServiceId_key" ON "NodejsService"("buildiableServiceId");
CREATE TABLE "new_PostgresService" (
    "serviceId" TEXT NOT NULL,
    "user" TEXT NOT NULL DEFAULT 'postgres',
    "password" TEXT NOT NULL,
    "database" TEXT,
    CONSTRAINT "PostgresService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PostgresService" ("database", "password", "serviceId", "user") SELECT "database", "password", "serviceId", "user" FROM "PostgresService";
DROP TABLE "PostgresService";
ALTER TABLE "new_PostgresService" RENAME TO "PostgresService";
CREATE UNIQUE INDEX "PostgresService_serviceId_key" ON "PostgresService"("serviceId");
CREATE TABLE "new_StaticService" (
    "buildiableServiceId" TEXT NOT NULL,
    "publishDir" TEXT,
    CONSTRAINT "StaticService_buildiableServiceId_fkey" FOREIGN KEY ("buildiableServiceId") REFERENCES "BuildiableService" ("serviceId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StaticService" ("buildiableServiceId", "publishDir") SELECT "buildiableServiceId", "publishDir" FROM "StaticService";
DROP TABLE "StaticService";
ALTER TABLE "new_StaticService" RENAME TO "StaticService";
CREATE UNIQUE INDEX "StaticService_buildiableServiceId_key" ON "StaticService"("buildiableServiceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
