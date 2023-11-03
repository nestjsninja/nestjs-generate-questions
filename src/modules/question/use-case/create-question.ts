
import { QuestionRepository, UserRepository } from '@app/common';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Injectable()
export class CreateQuestionUseCase {
    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly userRepository: UserRepository
    ) { }

    async execute(createQuestionDto: CreateQuestionDto) {
        const user = await this.userRepository.findById(createQuestionDto.authorId);

        if (!user) {
            throw new NotFoundException('Author not found');
        }

        try {
            const question = await this.questionRepository.create({
                content: createQuestionDto.content,
                author: {
                    connect: {
                        id: user.id
                    }
                }
            });
            return question;
        } catch (e) {
            throw new BadRequestException('Was not possible to register');
        }
    }
}
