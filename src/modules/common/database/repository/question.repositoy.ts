import { Prisma, Question } from "@prisma/client";

export abstract class QuestionRepository {
    abstract findById(id: string): Promise<Question | null>
    abstract create(data: Prisma.QuestionCreateInput): Promise<Question>
    abstract findMany(): Promise<Question[]>
    abstract delete(id: string): Promise<void>
}