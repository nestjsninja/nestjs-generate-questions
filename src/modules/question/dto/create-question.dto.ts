import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString
} from 'class-validator';

export class CreateQuestionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    authorId: string;
}