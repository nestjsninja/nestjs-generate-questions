import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    username: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}