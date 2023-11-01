import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { PrismaUserRepository } from './prisma-user.repository';
import { Prisma, User } from '@prisma/client';

class PrismaServiceMock {
  user = {
    findUnique: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

describe('PrismaUserRepository', () => {
  let prismaUserRepository: PrismaUserRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaUserRepository,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    prismaUserRepository =
      module.get<PrismaUserRepository>(PrismaUserRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaUserRepository).toBeDefined();
  });

  it('should call prismaService.findMany when findMany is called', async () => {
    const users = [
      {
        id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
        username: 'John Doe',
        password: '123456',
      },
      {
        id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
        username: 'Jane Doe',
        password: '123456',
      },
    ] as User[];
    prismaService.user.findMany = jest.fn().mockReturnValueOnce(users);

    const result = await prismaUserRepository.findMany();

    expect(result).toEqual(users);
    expect(prismaService.user.findMany).toHaveBeenCalled();
  });

  it('should call prismaService.update when update is called', async () => {
    const id = 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf';
    const data: Prisma.UserUpdateInput = {
      username: 'Alice',
    };
    const updatedUser = {
      id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
      username: 'Alice',
      password: '123456',
    } as User;

    prismaService.user.update = jest.fn().mockReturnValueOnce(updatedUser);

    const result = await prismaUserRepository.update(id, data);

    expect(result).toEqual(updatedUser);
    expect(prismaService.user.update).toHaveBeenCalledWith({
      where: { id },
      data,
    });
  });

  it('should call prismaService.delete when delete is called', async () => {
    const id = 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf';

    prismaService.user.delete = jest.fn().mockResolvedValueOnce(undefined);

    await prismaUserRepository.delete(id);

    expect(prismaService.user.delete).toHaveBeenCalledWith({
      where: { id },
    });
  });

});
