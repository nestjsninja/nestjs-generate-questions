import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repositoy';
import { PrismaService } from './prisma/prisma.service';

// Non exported
import { PrismaUserRepository } from './prisma/repository/prisma-user.repository';
import { PrismaQuestionRepository } from './prisma/repository/prisma-question.repository';
import { QuestionRepository } from './repository/question.repositoy';
import { PrismaAnswerRepository } from './prisma/repository/prisma-answer.repository';
import { AnswerRepository } from './repository/answer.repositoy';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: QuestionRepository,
      useClass: PrismaQuestionRepository
    },
    {
      provide: AnswerRepository,
      useClass: PrismaAnswerRepository
    }
  ],
  exports: [PrismaService, UserRepository, QuestionRepository, AnswerRepository],
})
export class DatabaseModule { }
