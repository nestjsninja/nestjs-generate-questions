import { Prisma, User } from "@prisma/client";

export abstract class UserRepository {
    abstract findById(id: string): Promise<User | null>
    abstract findByUsername(username: string): Promise<User | null>
    abstract findMany(): Promise<User[]>
    abstract create(data: Prisma.UserCreateInput): Promise<User>
    abstract update(id: string, data: Prisma.UserUpdateInput): Promise<User>
    abstract delete(id: string): Promise<void>
}