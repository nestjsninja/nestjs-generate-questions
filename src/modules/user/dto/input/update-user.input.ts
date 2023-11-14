import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    id: string;

    @Field({ nullable: true })
    @IsOptional()
    @MinLength(6)
    username?: string;

    @Field({ nullable: true })
    @IsOptional()
    @MinLength(6)
    password?: string;
}