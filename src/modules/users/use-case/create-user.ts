
import { UserRepository } from '@app/common/database/repository/user.repositoy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async create() {
        const user = await this.userRepository.create({
            username: 'henrique',
            password: '123',
        });

        return user
    }
}
