import {
    Controller,
    Get
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QuestionDto } from '../dto/question.dto';
import { GetManyQuestionsUseCase } from '../use-case/get-many-questions';

@Controller('/question')
@ApiTags('question')
export class GetManyQuestionsController {
    constructor(private getManyQuestionsUseCase: GetManyQuestionsUseCase) { }

    @ApiOkResponse({ type: QuestionDto, isArray: true })
    @Get('')
    handle() {
        return this.getManyQuestionsUseCase.execute();
    }
}
