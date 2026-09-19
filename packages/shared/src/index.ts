// Shared domain types, used by both the API and the web app.
// These mirror the Prisma enums so the frontend can stay type-safe without
// importing server-only code.

export type VesselType =
  | 'CONTAINER_SHIP'
  | 'BULK_CARRIER'
  | 'TANKER'
  | 'GENERAL_CARGO'
  | 'OTHER';

export type VesselStatus = 'IN_SERVICE' | 'AT_PORT' | 'UNDER_MAINTENANCE' | 'LAID_UP';

export type ContainerType =
  | 'DRY_20'
  | 'DRY_40'
  | 'HIGH_CUBE_40'
  | 'REEFER_40'
  | 'TANK'
  | 'OPEN_TOP';

export type ContainerStatus =
  | 'EMPTY'
  | 'IN_YARD'
  | 'LOADED'
  | 'IN_TRANSIT'
  | 'DISCHARGED'
  | 'DELIVERED';

export interface Vessel {
  id: string;
  imo: string;
  name: string;
  type: VesselType;
  capacityTeu?: number | null;
  flag?: string | null;
  status: VesselStatus;
}

export interface Port {
  id: string;
  locode: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Container {
  id: string;
  isoNumber: string;
  type: ContainerType;
  ownerCode?: string | null;
  status: ContainerStatus;
  currentPortId?: string | null;
  vesselId?: string | null;
}
