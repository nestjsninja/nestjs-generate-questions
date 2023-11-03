import { Prisma, Answer } from "@prisma/client";

export abstract class AnswerRepository {
    abstract findById(id: string): Promise<Answer | null>
    abstract findMany(questionId: string): Promise<Answer[]>
    abstract create(data: Prisma.AnswerCreateInput): Promise<Answer>
    abstract delete(id: string): Promise<void>
}