import { ApiProperty } from '@nestjs/swagger';
import { Question } from '@prisma/client';

export class QuestionDto implements Question {
    @ApiProperty()
    id: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    authorId: string;
}