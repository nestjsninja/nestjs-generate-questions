import { ApiProperty } from '@nestjs/swagger';
import {
    IsOptional,
    IsString,
    MinLength
} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MinLength(5)
    @ApiProperty()
    username?: string;

    @IsString()
    @IsOptional()
    @MinLength(6)
    @ApiProperty()
    password?: string;
}