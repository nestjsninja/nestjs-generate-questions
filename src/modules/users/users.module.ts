import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserUseCase } from './use-case/create-user';

@Module({
    controllers: [CreateUserController],
    imports: [DatabaseModule],
    providers: [CreateUserUseCase],
    exports: [],
})
export class UsersModule { }
