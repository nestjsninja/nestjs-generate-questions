import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByIdUseCase } from './get-user-by-id';
import { UserRepository } from '@app/common';
import { User } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

class UserRepositoryMock {
    findById = jest.fn();
}

describe('GetUserByIdUseCase', () => {
    let getUserByIdUseCase: GetUserByIdUseCase;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetUserByIdUseCase,
                {
                    provide: UserRepository,
                    useClass: UserRepositoryMock,
                },
            ],
        }).compile();

        getUserByIdUseCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(getUserByIdUseCase).toBeDefined();
    });

    it('should get a user by id', async () => {
        const user: User = {
            id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
            username: 'henrique',
            password: '123',
        };
        userRepository.findById = jest.fn().mockResolvedValue(user);

        const result = await getUserByIdUseCase.execute(user.id);

        expect(result).toEqual(user);
        expect(userRepository.findById).toHaveBeenCalledWith(user.id);
    });

    it('should throw a not found exception when the user is not found', async () => {
        const id = 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf';
        userRepository.findById = jest.fn().mockResolvedValue(null);

        await expect(getUserByIdUseCase.execute(id)).rejects.toThrow(NotFoundException);

        expect(userRepository.findById).toHaveBeenCalledWith(id);
    });
});
