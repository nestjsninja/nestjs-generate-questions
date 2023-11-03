
import { UserRepository } from '@app/common';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string) {
        try {
            await this.userRepository.delete(id);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}
