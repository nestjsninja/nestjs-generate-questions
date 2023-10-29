import { Prisma, User } from "@prisma/client";

export abstract class UserRepository {
    abstract findOne(where: Prisma.UserWhereUniqueInput): Promise<User | null>
    abstract create(user: any): Promise<User>
}