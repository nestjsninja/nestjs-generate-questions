import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Question as QuestionDB } from '@prisma/client';

@ObjectType()
export class Question {
    @Field(() => ID)
    id: QuestionDB[`id`];

    @Field(() => String)
    content: QuestionDB[`content`];

    @Field(() => GraphQLISODateTime)
    createdAt: QuestionDB[`createdAt`];

    @Field(() => GraphQLISODateTime)
    updatedAt: QuestionDB[`updatedAt`];

    @Field(() => ID)
    authorId: QuestionDB[`authorId`];
}