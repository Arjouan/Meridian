import { BadRequestException, NotFoundException } from '@nestjs/common';
import { VoyagesService } from './voyages.service';

// A UNIT TEST: we test the service in isolation by giving it a FAKE Prisma client
// (a plain object with jest mock functions). No real database is touched — fast and reliable.
describe('VoyagesService', () => {
  // Minimal fake of the Prisma delegates the service uses.
  const mockPrisma = {
    voyage: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    vessel: { findUnique: jest.fn() },
    port: { findUnique: jest.fn() },
  };

  let service: VoyagesService;

  beforeEach(() => {
    jest.clearAllMocks();
    // `as any` because we only implement the small part of PrismaService the service needs.
    service = new VoyagesService(mockPrisma as any);
  });

  it('findOne() throws NotFoundException when the voyage does not exist', async () => {
    mockPrisma.voyage.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing-id')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create() creates the port calls nested in the voyage', async () => {
    const portCalls = [
      { portId: 'p1', sequence: 1 },
      { portId: 'p2', sequence: 2 },
    ];
    const dto = { reference: 'VY000001', vesselId: 'v1', portCalls } as any;
    mockPrisma.vessel.findUnique.mockResolvedValue({ id: 'v1' });
    mockPrisma.port.findUnique.mockResolvedValue({ id: 'p' });
    mockPrisma.voyage.create.mockResolvedValue({ id: '1' });

    await service.create(dto);

    expect(mockPrisma.voyage.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { reference: 'VY000001', vesselId: 'v1', portCalls: { create: portCalls } },
      }),
    );
  });

  it('create() throws BadRequestException when the vessel does not exist', async () => {
    const dto = { reference: 'VY000001', vesselId: 'missing-vessel', portCalls: [] } as any;
    mockPrisma.vessel.findUnique.mockResolvedValue(null);

    await expect(service.create(dto)).rejects.toBeInstanceOf(BadRequestException);
    expect(mockPrisma.voyage.create).not.toHaveBeenCalled();
  });

  it('create() throws BadRequestException when a port call points at a missing port', async () => {
    const dto = {
      reference: 'VY000001',
      vesselId: 'v1',
      portCalls: [{ portId: 'missing-port', sequence: 1 }],
    } as any;
    mockPrisma.vessel.findUnique.mockResolvedValue({ id: 'v1' });
    mockPrisma.port.findUnique.mockResolvedValue(null);

    await expect(service.create(dto)).rejects.toBeInstanceOf(BadRequestException);
    expect(mockPrisma.voyage.create).not.toHaveBeenCalled();
  });

  it('update() throws NotFoundException when the voyage does not exist', async () => {
    mockPrisma.voyage.findUnique.mockResolvedValue(null);

    await expect(service.update('missing-id', { status: 'COMPLETED' } as any)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(mockPrisma.voyage.update).not.toHaveBeenCalled();
  });

  it('update() with portCalls replaces the whole list (deleteMany + create)', async () => {
    const portCalls = [{ portId: 'p1', sequence: 1 }];
    mockPrisma.voyage.findUnique.mockResolvedValue({ id: '1' });
    mockPrisma.port.findUnique.mockResolvedValue({ id: 'p1' });
    mockPrisma.voyage.update.mockResolvedValue({ id: '1' });

    await service.update('1', { portCalls } as any);

    expect(mockPrisma.voyage.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: '1' },
        data: { portCalls: { deleteMany: {}, create: portCalls } },
      }),
    );
  });

  it('update() without portCalls leaves the existing port calls alone', async () => {
    mockPrisma.voyage.findUnique.mockResolvedValue({ id: '1' });
    mockPrisma.voyage.update.mockResolvedValue({ id: '1' });

    await service.update('1', { status: 'COMPLETED' } as any);

    expect(mockPrisma.voyage.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { status: 'COMPLETED', portCalls: undefined },
      }),
    );
  });

  it('remove() deletes the voyage and returns its id', async () => {
    mockPrisma.voyage.findUnique.mockResolvedValue({ id: '1' });
    mockPrisma.voyage.delete.mockResolvedValue({ id: '1' });

    await expect(service.remove('1')).resolves.toEqual({ deleted: true, id: '1' });
    expect(mockPrisma.voyage.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
