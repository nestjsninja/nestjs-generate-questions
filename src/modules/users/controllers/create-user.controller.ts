import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post
} from '@nestjs/common';
import { CreateUserUseCase } from '../use-case/create-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@Controller('user')
@ApiTags('user')
export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) { }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: UserDto })
    @Post('create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.create();
    }
}
