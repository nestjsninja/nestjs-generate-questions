import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user';
import { UserRepository } from '@app/common';
import { User } from '@prisma/client';

class UserRepositoryMock {
  findUnique = jest.fn();
  create = jest.fn();
}

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository,
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
  });

  it('should create and user', async () => {
    const user = {
      id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
      username: 'henrique',
      password: '123',
    } as User;
    userRepository.create = jest.fn().mockReturnValueOnce(user);
    const result = await createUserUseCase.create();

    expect(result).toEqual(user);
    expect(userRepository.create).toHaveBeenCalledWith({
      username: 'henrique',
      password: '123',
    });
  });
});
