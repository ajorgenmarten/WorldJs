-- CreateTable
CREATE TABLE "StaticService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "projectPath" TEXT NOT NULL,
    "rootDir" TEXT,
    "buildCommand" TEXT,
    "publishDir" TEXT,
    "port" INTEGER NOT NULL,
    "envVars" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StaticService_slug_key" ON "StaticService"("slug");
