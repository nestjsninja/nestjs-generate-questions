import { AIModule, DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { CreateQuestionController } from './controllers/create-question.controller';
import { CreateQuestionUseCase } from './use-case/create-question';
import { GetQuestionByIdController } from './controllers/get-question-by-id.controller';
import { GetManyQuestionsController } from './controllers/get-many-question.controller';
import { GetQuestionByIdUseCase } from './use-case/get-question-by-id';
import { GetManyQuestionsUseCase } from './use-case/get-many-questions';

@Module({
    controllers: [CreateQuestionController, GetQuestionByIdController, GetManyQuestionsController],
    imports: [DatabaseModule, AIModule],
    providers: [CreateQuestionUseCase, GetQuestionByIdUseCase, GetManyQuestionsUseCase],
    exports: [],
})
export class QuestionModule { }
