import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { CreateQuestionController } from './controllers/create-question.controller';
import { CreateQuestionUseCase } from './use-case/create-question';

@Module({
    controllers: [CreateQuestionController],
    imports: [DatabaseModule],
    providers: [CreateQuestionUseCase],
    exports: [],
})
export class QuestionModule { }
