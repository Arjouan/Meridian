-- CreateEnum
CREATE TYPE "VesselType" AS ENUM ('CONTAINER_SHIP', 'BULK_CARRIER', 'TANKER', 'GENERAL_CARGO', 'OTHER');

-- CreateEnum
CREATE TYPE "VesselStatus" AS ENUM ('IN_SERVICE', 'AT_PORT', 'UNDER_MAINTENANCE', 'LAID_UP');

-- CreateEnum
CREATE TYPE "ContainerType" AS ENUM ('DRY_20', 'DRY_40', 'HIGH_CUBE_40', 'REEFER_40', 'TANK', 'OPEN_TOP');

-- CreateEnum
CREATE TYPE "ContainerStatus" AS ENUM ('EMPTY', 'IN_YARD', 'LOADED', 'IN_TRANSIT', 'DISCHARGED', 'DELIVERED');

-- CreateTable
CREATE TABLE "Vessel" (
    "id" TEXT NOT NULL,
    "imo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "VesselType" NOT NULL DEFAULT 'CONTAINER_SHIP',
    "capacityTeu" INTEGER,
    "flag" TEXT,
    "status" "VesselStatus" NOT NULL DEFAULT 'IN_SERVICE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vessel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Port" (
    "id" TEXT NOT NULL,
    "locode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Port_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Container" (
    "id" TEXT NOT NULL,
    "isoNumber" TEXT NOT NULL,
    "type" "ContainerType" NOT NULL DEFAULT 'DRY_40',
    "ownerCode" TEXT,
    "status" "ContainerStatus" NOT NULL DEFAULT 'EMPTY',
    "currentPortId" TEXT,
    "vesselId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vessel_imo_key" ON "Vessel"("imo");

-- CreateIndex
CREATE UNIQUE INDEX "Port_locode_key" ON "Port"("locode");

-- CreateIndex
CREATE UNIQUE INDEX "Container_isoNumber_key" ON "Container"("isoNumber");

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_currentPortId_fkey" FOREIGN KEY ("currentPortId") REFERENCES "Port"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_vesselId_fkey" FOREIGN KEY ("vesselId") REFERENCES "Vessel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
