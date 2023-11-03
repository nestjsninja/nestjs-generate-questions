import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    NotFoundException,
    Post
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionDto } from '../dto/question.dto';
import { CreateQuestionUseCase } from '../use-case/create-question';

@Controller('/question')
@ApiTags('question')
export class CreateQuestionController {
    constructor(private createQuestionUseCase: CreateQuestionUseCase) { }

    @ApiOkResponse({ type: QuestionDto })
    @HttpCode(HttpStatus.CREATED)
    @Post('')
    handle(@Body() createQuestionDto: CreateQuestionDto) {
        try {
            const question = this.createQuestionUseCase.execute(createQuestionDto);
            return question;
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw new HttpException('Author not found', HttpStatus.CONFLICT);
            }
            throw new HttpException('Was not possible to register', HttpStatus.BAD_REQUEST);
        }
    }
}
