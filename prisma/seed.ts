import { PrismaClient } from '@prisma/client';

// Seed script: inserts a few real vessels so the app has data to show.
// Run with:  npm run db:seed
// It uses `upsert` (keyed on the unique IMO) so it's safe to run repeatedly.
const prisma = new PrismaClient();

const vessels = [
  { imo: '9703291', name: 'MSC Oscar', type: 'CONTAINER_SHIP', capacityTeu: 19224, flag: 'PA', status: 'IN_SERVICE' },
  { imo: '9454436', name: 'CMA CGM Marco Polo', type: 'CONTAINER_SHIP', capacityTeu: 16022, flag: 'FR', status: 'IN_SERVICE' },
  { imo: '9811000', name: 'Ever Given', type: 'CONTAINER_SHIP', capacityTeu: 20124, flag: 'PA', status: 'AT_PORT' },
  { imo: '9321483', name: 'Emma Maersk', type: 'CONTAINER_SHIP', capacityTeu: 15500, flag: 'DK', status: 'UNDER_MAINTENANCE' },
] as const;

const ports = [
  { locode: 'NLRTM', name: 'Port of Rotterdam', country: 'NL', latitude: 51.95, longitude: 4.14 },
  { locode: 'FRLEH', name: 'Le Havre', country: 'FR', latitude: 49.48, longitude: 0.11 },
  { locode: 'SGSIN', name: 'Port of Singapore', country: 'SG', latitude: 1.26, longitude: 103.83 },
] as const;

async function main() {
  for (const v of vessels) {
    await prisma.vessel.upsert({
      where: { imo: v.imo },
      update: { ...v },
      create: { ...v },
    });
  }
  
  console.log(`Seeded ${vessels.length} vessels.`);

  for (const p of ports) {
    await prisma.port.upsert({
      where: { locode: p.locode },
      update: { ...p },
      create: { ...p },
    });
  }
  
  console.log(`Seeded ${ports.length} ports.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
