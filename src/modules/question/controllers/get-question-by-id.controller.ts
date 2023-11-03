import {
    Controller,
    Get,
    Param
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QuestionDto } from '../dto/question.dto';
import { GetQuestionByIdUseCase } from '../use-case/get-question-by-id';

@Controller('/question')
@ApiTags('question')
export class GetQuestionByIdController {
    constructor(private getQuestionByIdUseCase: GetQuestionByIdUseCase) { }

    @ApiOkResponse({ type: QuestionDto })
    @Get(':id')
    handle(@Param('id') id: string) {
        return this.getQuestionByIdUseCase.execute(id);
    }
}
