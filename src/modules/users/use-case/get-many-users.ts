
import { UserRepository } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetManyUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute() {
        const users = await this.userRepository.findMany();

        return users;
    }
}
