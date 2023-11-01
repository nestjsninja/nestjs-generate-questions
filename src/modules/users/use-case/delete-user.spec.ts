import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserUseCase } from './delete-user';
import { UserRepository } from '@app/common';
import { InternalServerErrorException } from '@nestjs/common';

class UserRepositoryMock {
    delete = jest.fn();
}

describe('DeleteUserUseCase', () => {
    let deleteUserUseCase: DeleteUserUseCase;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteUserUseCase,
                {
                    provide: UserRepository,
                    useClass: UserRepositoryMock,
                },
            ],
        }).compile();

        deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(deleteUserUseCase).toBeDefined();
    });

    it('should delete a user', async () => {
        const id = 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf';
        userRepository.delete = jest.fn().mockResolvedValue(undefined);

        await deleteUserUseCase.execute(id);

        expect(userRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an internal server error exception when it was not possible to delete', async () => {
        const id = 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf';
        userRepository.delete = jest.fn().mockRejectedValue(new Error());

        await expect(deleteUserUseCase.execute(id)).rejects.toThrow(InternalServerErrorException);

        expect(userRepository.delete).toHaveBeenCalledWith(id);
    });
});
