import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserUseCase } from './use-case/create-user';
import { GetUserByIdController } from './controllers/get-user-by-id.controller';
import { GetUserByIdUseCase } from './use-case/get-user-by-id';
import { GetManyUsersUseCase } from './use-case/get-many-users';
import { GetManyUsersController } from './controllers/get-many-users.controller';
import { DeleteUserController } from './controllers/delete-user.controller';
import { DeleteUserUseCase } from './use-case/delete-user';
import { UpdateUserUseCase } from './use-case/update-user';
import { UpdateUserController } from './controllers/update-user.controller';
import { UserResolver } from './resolvers/user.resolver';

@Module({
    controllers: [CreateUserController, GetUserByIdController, GetManyUsersController, DeleteUserController, UpdateUserController],
    imports: [DatabaseModule],
    providers: [CreateUserUseCase, GetUserByIdUseCase, GetManyUsersUseCase, DeleteUserUseCase, UpdateUserUseCase, UserResolver],
    exports: [],
})
export class UserModule { }
