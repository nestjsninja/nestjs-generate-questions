import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements User {
    @ApiProperty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string | null;
}