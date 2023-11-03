
import { AIChatGenerator, QuestionRepository, UserRepository } from '@app/common';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Injectable()
export class CreateQuestionUseCase {
    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly userRepository: UserRepository,
        private readonly aIChatGenerator: AIChatGenerator
    ) { }

    async execute(createQuestionDto: CreateQuestionDto) {
        const user = await this.userRepository.findById(createQuestionDto.authorId);

        if (!user) {
            throw new NotFoundException('Author not found');
        }

        const answers = await this.aIChatGenerator.ask("give me 3 different answers, ansering how much is 1+2, onde of these must be the right. Your answer for this question must be a JSON and you don't have to send anything else apart from the JSON. example of format of the JSON [{text: '',correct: false}]")

        if (answers)
            console.log(answers.text);

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
