
import { AIChatGenerator, QuestionRepository, UserRepository } from '@app/common';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { AnswerRepository } from '@app/common/database/repository/answer.repositoy';

type Message = {
    text: string;
    correct: boolean;
};

@Injectable()
export class CreateQuestionUseCase {
    private NUMBER_OF_QUESTIONS_REQUESTS = 3;

    constructor(
        private readonly answerRepository: AnswerRepository,
        private readonly questionRepository: QuestionRepository,
        private readonly userRepository: UserRepository,
        private readonly aIChatGenerator: AIChatGenerator
    ) { }

    async execute(createQuestionDto: CreateQuestionDto) {
        const user = await this.userRepository.findById(createQuestionDto.authorId);

        if (!user)
            throw new NotFoundException('Author not found');

        const encodedQuestion = encodeURIComponent(createQuestionDto.content);
        const AIAnswers = await this.aIChatGenerator.ask(`Generate ${this.NUMBER_OF_QUESTIONS_REQUESTS} different answers for the question "${encodedQuestion}". One of these answers must be the correct answer. Follow this formar [{text: 'Answer', correct: true/false}], it will be an array of objects. Do not provide the answers as a list. Remove any space or breakline that the response can have, send it as raw as possible`)
        const formatedAnswer = AIAnswers.text.trim();

        const regex = /\[([^\]]*)\]/;
        const match = formatedAnswer.match(regex);

        if (!match)
            throw new BadRequestException('Generated answers are not compatable');

        try {
            const jsonArrayString = `[${match[1]}]`;
            const answers: Message[] = JSON.parse(jsonArrayString);

            const question = await this.questionRepository.create({
                content: createQuestionDto.content,
                author: {
                    connect: {
                        id: user.id
                    }
                },
            });

            if (answers.length < this.NUMBER_OF_QUESTIONS_REQUESTS)
                throw new BadRequestException(`It was not possible to generate the amount (${this.NUMBER_OF_QUESTIONS_REQUESTS}) of answers requested`);

            for (const answerData of answers) {
                await this.answerRepository.create({
                    content: answerData.text,
                    correct: answerData.correct,
                    question: {
                        connect: {
                            id: question.id
                        }
                    },
                });
            }

            const updatedQuestion = await this.questionRepository.findById(question.id);

            return updatedQuestion;
        } catch (e) {
            throw new BadRequestException('Was not possible to register');
        }
    }
}
