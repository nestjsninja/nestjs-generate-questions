import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUserArgs } from '../dto/args/get-user.args';
import { CreateUserInput } from '../dto/input/create-user.input';
import { UpdateUserInput } from '../dto/input/update-user.input';
import { CreateUserUseCase } from '../use-case/create-user';
import { DeleteUserUseCase } from '../use-case/delete-user';
import { GetManyUsersUseCase } from '../use-case/get-many-users';
import { GetUserByIdUseCase } from '../use-case/get-user-by-id';
import { UpdateUserUseCase } from '../use-case/update-user';
import { User } from '../user.model';

@Resolver('User')
export class UserResolver {
    constructor(
        private readonly getManyUsersUseCase: GetManyUsersUseCase,
        private createUserUseCase: CreateUserUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) { }

    @Query(() => User, { name: 'user', nullable: false })
    async getUser(@Args() getUserArgs: GetUserArgs) {
        return this.getUserByIdUseCase.execute(getUserArgs.id)
    }

    @Query(() => [User], { name: 'users', nullable: false })
    async getUsers() {
        return await this.getManyUsersUseCase.execute();
    }

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
    ) {
        return await this.createUserUseCase.execute(createUserInput);
    }

    @Mutation(() => User)
    async updateUser(
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ) {
        return await this.updateUserUseCase.execute(updateUserInput.id, updateUserInput);
    }

    @Mutation(() => User)
    async deleteUser(
        @Args('id') id: string
    ) {
        return await this.deleteUserUseCase.execute(id);
    }
}