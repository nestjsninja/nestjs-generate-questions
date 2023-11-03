
import { QuestionRepository } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetManyQuestionsUseCase {
    constructor(private readonly questionRepository: QuestionRepository) { }

    async execute() {
        const questions = await this.questionRepository.findMany();

        return questions;
    }
}
