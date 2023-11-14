import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User as UserDB } from '@prisma/client';

@ObjectType()
export class User {
    @Field(() => ID)
    id: UserDB[`id`];

    @Field(() => String)
    username: UserDB[`username`];

    @Field(() => String)
    password: UserDB[`password`];
}