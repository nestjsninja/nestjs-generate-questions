import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user';
import { UserRepository } from '@app/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

class UserRepositoryMock {
  findByUsername = jest.fn();
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

  it('should create a user when the username is available', async () => {
    const userDto: CreateUserDto = {
      username: 'henrique',
      password: '123',
    };
    const user: User = {
      id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
      ...userDto,
    };
    userRepository.findByUsername = jest.fn().mockResolvedValue(null);
    userRepository.create = jest.fn().mockResolvedValue(user);

    const result = await createUserUseCase.execute(userDto);

    expect(result).toEqual(user);
    expect(userRepository.findByUsername).toHaveBeenCalledWith(userDto.username);
    expect(userRepository.create).toHaveBeenCalledWith(userDto);
  });

  it('should throw a conflict exception when the username is not available', async () => {
    const userDto: CreateUserDto = {
      username: 'henrique',
      password: '123',
    };
    userRepository.findByUsername = jest.fn().mockResolvedValue(true);

    await expect(createUserUseCase.execute(userDto)).rejects.toThrow('This username is already in use');

    expect(userRepository.findByUsername).toHaveBeenCalledWith(userDto.username);
  });

  it('should throw a bad request exception when it was not possible to register', async () => {
    const userDto: CreateUserDto = {
      username: 'henrique',
      password: '123',
    };
    userRepository.findByUsername = jest.fn().mockResolvedValue(null);
    userRepository.create = jest.fn().mockRejectedValue(new Error());

    await expect(createUserUseCase.execute(userDto)).rejects.toThrow('Was not possible to register');

    expect(userRepository.findByUsername).toHaveBeenCalledWith(userDto.username);
    expect(userRepository.create).toHaveBeenCalledWith(userDto);
  });
});
