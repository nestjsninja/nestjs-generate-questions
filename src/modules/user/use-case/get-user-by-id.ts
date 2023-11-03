
import { UserRepository } from '@app/common';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
