
import { QuestionRepository } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetQuestionByAuthorUseCase {
    constructor(private readonly questionRepository: QuestionRepository) { }

    async execute(id: string) {
        const questions = await this.questionRepository.findByAuthorId(id);

        return questions || [];
    }
}
