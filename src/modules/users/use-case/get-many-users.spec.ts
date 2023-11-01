import { Test, TestingModule } from '@nestjs/testing';
import { GetManyUsersUseCase } from './get-many-users';
import { UserRepository } from '@app/common';
import { User } from '@prisma/client';

class UserRepositoryMock {
    findMany = jest.fn();
}

describe('GetManyUsersUseCase', () => {
    let getManyUsersUseCase: GetManyUsersUseCase;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetManyUsersUseCase,
                {
                    provide: UserRepository,
                    useClass: UserRepositoryMock,
                },
            ],
        }).compile();

        getManyUsersUseCase = module.get<GetManyUsersUseCase>(GetManyUsersUseCase);
        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(getManyUsersUseCase).toBeDefined();
    });

    it('should get many users', async () => {
        const users: User[] = [
            {
                id: 'fsdfsd-sdfsdfsd-sdfsdfsd-sdfsdf',
                username: 'henrique',
                password: '123',
            },
            {
                id: 'sdfsdf-sdfsdfsd-sdfsdfsd-sdfsdf',
                username: 'john',
                password: '456',
            },
        ];
        userRepository.findMany = jest.fn().mockResolvedValue(users);

        const result = await getManyUsersUseCase.execute();

        expect(result).toEqual(users);
        expect(userRepository.findMany).toHaveBeenCalled();
    });
});
