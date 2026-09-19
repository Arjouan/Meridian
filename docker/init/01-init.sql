-- Runs once, automatically, the first time the database volume is created.
-- Enables the PostGIS extension used for geographic data (ports, positions, routes).
CREATE EXTENSION IF NOT EXISTS postgis;

-- Later phases (see docs/ARCHITECTURE.md):
--   * TimescaleDB  -> high-volume container tracking events (time-series)
--   * pgRouting    -> voyage / transshipment routing across the port network
-- These require a different base image or an extension install and will be added then.
