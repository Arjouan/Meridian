import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ContainersService } from './containers.service';

// A UNIT TEST: we test the service in isolation by giving it a FAKE Prisma client
// (a plain object with jest mock functions). No real database is touched — fast and reliable.
describe('ContainersService', () => {
  // Minimal fake of the `prisma.container` delegate the service uses.
  const mockPrisma = {
    container: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    vessel: { findUnique: jest.fn() },
    port: { findUnique: jest.fn() },
  };

  let service: ContainersService;

  beforeEach(() => {
    jest.clearAllMocks();
    // `as any` because we only implement the small part of PrismaService the service needs.
    service = new ContainersService(mockPrisma as any);
  });

  it('findOne() throws NotFoundException when the container does not exist', async () => {
    mockPrisma.container.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing-id')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('create() without vesselId/currentPortId skips the relation lookups', async () => {
    const dto = { isoNumber: 'MSCU7045312' } as any;
    const created = { id: '1', ...dto };
    mockPrisma.container.create.mockResolvedValue(created);

    await expect(service.create(dto)).resolves.toBe(created);
    expect(mockPrisma.container.create).toHaveBeenCalledWith({ data: dto });
    expect(mockPrisma.vessel.findUnique).not.toHaveBeenCalled();
  });

  it('create() throws BadRequestException when the vessel does not exist', async () => {
    const dto = { isoNumber: 'MSCU7045312', vesselId: 'missing-vessel' } as any;
    mockPrisma.vessel.findUnique.mockResolvedValue(null);

    await expect(service.create(dto)).rejects.toBeInstanceOf(BadRequestException);
    expect(mockPrisma.container.create).not.toHaveBeenCalled();
  });

  it('create() throws BadRequestException when the port does not exist', async () => {
    const dto = { isoNumber: 'MSCU7045312', currentPortId: 'missing-port' } as any;
    mockPrisma.port.findUnique.mockResolvedValue(null);

    await expect(service.create(dto)).rejects.toBeInstanceOf(BadRequestException);
    expect(mockPrisma.container.create).not.toHaveBeenCalled();
  });

});
