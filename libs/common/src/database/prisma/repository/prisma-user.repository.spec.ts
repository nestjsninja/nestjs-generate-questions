import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { PrismaUserRepository } from './prisma-user.repository';
import { Prisma, User } from '@prisma/client';

class PrismaServiceMock {
  user = {
    findUnique: jest.fn(),
    create: jest.fn(),
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

  it('should call prismaService.findUnique when findOne is called', async () => {
    const where: Prisma.UserWhereUniqueInput = {
      id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
    };
    const user = {
      id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
      username: 'John Doe',
      password: '123456',
    } as User;
    prismaService.user.findUnique = jest.fn().mockReturnValueOnce(user);
    const result = await prismaUserRepository.findOne(where);

    expect(result).toEqual(user);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where });
  });

  it('should call prismaService.create when create is called', async () => {
    const userData: Prisma.UserCreateInput = {
      username: 'Alice',
      password: '123456',
    };
    const createdUser = {
      id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
      username: 'Alice',
      password: '123456',
    } as User;

    prismaService.user.create = jest.fn().mockReturnValueOnce(createdUser);

    const result = await prismaUserRepository.create(userData);

    expect(result).toEqual(createdUser);
    expect(prismaService.user.create).toHaveBeenCalledWith({ data: userData });
  });
});
