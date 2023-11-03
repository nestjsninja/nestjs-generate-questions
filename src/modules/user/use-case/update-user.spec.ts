import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from './update-user';
import { UserRepository } from '@app/common';
import { User } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

class UserRepositoryMock {
    findById = jest.fn();
    update = jest.fn();
}

describe('UpdateUserUseCase', () => {
    let updateUserUseCase: UpdateUserUseCase;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UpdateUserUseCase,
                {
                    provide: UserRepository,
                    useClass: UserRepositoryMock,
                },
            ],
        }).compile();

        updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(updateUserUseCase).toBeDefined();
    });

    it('should update a user', async () => {
        const id = 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf';
        const updateUserDto: UpdateUserDto = {
            username: 'new-username',
        };
        const user: User = {
            id,
            username: 'old-username',
            password: '123',
        };
        userRepository.findById = jest.fn().mockResolvedValue(user);
        userRepository.update = jest.fn().mockResolvedValue({ ...user, ...updateUserDto });

        const result = await updateUserUseCase.execute(id, updateUserDto);

        expect(result).toEqual({ ...user, ...updateUserDto });
        expect(userRepository.findById).toHaveBeenCalledWith(id);
        expect(userRepository.update).toHaveBeenCalledWith(id, { ...user, ...updateUserDto });
    });

    it('should throw a not found exception when the user is not found', async () => {
        const id = 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf';
        const updateUserDto: UpdateUserDto = {
            username: 'new-username',
        };
        userRepository.findById = jest.fn().mockResolvedValue(null);

        await expect(updateUserUseCase.execute(id, updateUserDto)).rejects.toThrow(NotFoundException);

        expect(userRepository.findById).toHaveBeenCalledWith(id);
    });

    it('should throw a bad request exception when it was not possible to update', async () => {
        const id = 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf';
        const updateUserDto: UpdateUserDto = {
            username: 'new-username',
        };
        const user: User = {
            id,
            username: 'old-username',
            password: '123',
        };
        userRepository.findById = jest.fn().mockResolvedValue(user);
        userRepository.update = jest.fn().mockRejectedValue(new Error());

        await expect(updateUserUseCase.execute(id, updateUserDto)).rejects.toThrow(BadRequestException);

        expect(userRepository.findById).toHaveBeenCalledWith(id);
        expect(userRepository.update).toHaveBeenCalledWith(id, { ...user, ...updateUserDto });
    });
});
