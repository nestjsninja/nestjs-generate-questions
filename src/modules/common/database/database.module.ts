import { Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repositoy';
import { PrismaService } from './prisma/prisma.service';

// Non exported
import { PrismaUserRepository } from './prisma/repository/prisma-user.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule { }
