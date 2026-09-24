import { NotFoundException } from '@nestjs/common';
import { PortsService } from './ports.service';

// A UNIT TEST: we test the service in isolation by giving it a FAKE Prisma client
// (a plain object with jest mock functions). No real database is touched — fast and reliable.
describe('PortsService', () => {
  // Minimal fake of the `prisma.port` delegate the service uses.
  const mockPrisma = {
    port: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  let service: PortsService;

  beforeEach(() => {
    jest.clearAllMocks();
    // `as any` because we only implement the small part of PrismaService the service needs.
    service = new PortsService(mockPrisma as any);
  });

  it('findAll() returns ports ordered by name', async () => {
    const rows = [{ id: '1', name: 'Rotterdam' }];
    mockPrisma.port.findMany.mockResolvedValue(rows);

    await expect(service.findAll()).resolves.toBe(rows);
    expect(mockPrisma.port.findMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
  });

  it('findOne() throws NotFoundException when the port does not exist', async () => {
    mockPrisma.port.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing-id')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('findOne() returns the port when it exists', async () => {
    const port = { id: '1', name: 'Rotterdam' };
    mockPrisma.port.findUnique.mockResolvedValue(port);

    await expect(service.findOne('1')).resolves.toBe(port);
    expect(mockPrisma.port.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('create() passes the DTO through to prisma', async () => {
    const dto = { locode: 'NLRTM', name: 'Rotterdam' } as any;
    const created = { id: '1', ...dto };
    mockPrisma.port.create.mockResolvedValue(created);

    await expect(service.create(dto)).resolves.toBe(created);
    expect(mockPrisma.port.create).toHaveBeenCalledWith({ data: dto });
  });

  it('remove() checks existence then deletes', async () => {
    mockPrisma.port.findUnique.mockResolvedValue({ id: '1' });
    mockPrisma.port.delete.mockResolvedValue({});

    await expect(service.remove('1')).resolves.toEqual({ deleted: true, id: '1' });
    expect(mockPrisma.port.delete).toHaveBeenCalledWith({ where: { id: '1' } });
  });
});
