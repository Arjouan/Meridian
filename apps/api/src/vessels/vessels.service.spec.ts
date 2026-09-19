import { NotFoundException } from '@nestjs/common';
import { VesselsService } from './vessels.service';

// A UNIT TEST: we test the service in isolation by giving it a FAKE Prisma client
// (a plain object with jest mock functions). No real database is touched — fast and reliable.
// This is the pattern to copy when you write tests for Ports and Containers.
describe('VesselsService', () => {
  // Minimal fake of the `prisma.vessel` delegate the service uses.
  const mockPrisma = {
    vessel: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  let service: VesselsService;

  beforeEach(() => {
    jest.clearAllMocks();
    // `as any` because we only implement the small part of PrismaService the service needs.
    service = new VesselsService(mockPrisma as any);
  });

  it('findAll() returns vessels ordered by name', async () => {
    const rows = [{ id: '1', name: 'Aurora' }];
    mockPrisma.vessel.findMany.mockResolvedValue(rows);

    await expect(service.findAll()).resolves.toBe(rows);
    expect(mockPrisma.vessel.findMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
  });

  it('findOne() throws NotFoundException when the vessel does not exist', async () => {
    mockPrisma.vessel.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing-id')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('findOne() returns the vessel when it exists', async () => {
    const vessel = { id: '1', name: 'Aurora' };
    mockPrisma.vessel.findUnique.mockResolvedValue(vessel);

    await expect(service.findOne('1')).resolves.toBe(vessel);
    expect(mockPrisma.vessel.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('create() passes the DTO through to prisma', async () => {
    const dto = { imo: '9999999', name: 'Test Ship' } as any;
    const created = { id: '1', ...dto };
    mockPrisma.vessel.create.mockResolvedValue(created);

    await expect(service.create(dto)).resolves.toBe(created);
    expect(mockPrisma.vessel.create).toHaveBeenCalledWith({ data: dto });
  });

  it('remove() checks existence then deletes', async () => {
    mockPrisma.vessel.findUnique.mockResolvedValue({ id: '1' });
    mockPrisma.vessel.delete.mockResolvedValue({});

    await expect(service.remove('1')).resolves.toEqual({ deleted: true, id: '1' });
    expect(mockPrisma.vessel.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
