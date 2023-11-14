
import { UserRepository } from '@app/common';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserInput } from '../dto/input/update-user.input';

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string, updateUserDto: UpdateUserDto | UpdateUserInput) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new NotFoundException();
        }

        try {
            const updatedData = {
                ...user,
                ...updateUserDto,
            };

            const userUpdated = await this.userRepository.update(id, updatedData);
            return userUpdated;
        } catch (e) {
            throw new BadRequestException('Was not possible to register');
        }
    }
}
