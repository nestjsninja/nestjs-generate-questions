import {
    Controller,
    Get
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { GetManyUsersUseCase } from '../use-case/get-many-users';

@Controller('/user')
@ApiTags('user')
export class GetManyUsersController {
    constructor(private getManyUsersUseCase: GetManyUsersUseCase) { }

    @ApiOkResponse({ type: UserDto, isArray: true })
    @Get('')
    handle() {
        return this.getManyUsersUseCase.execute();
    }
}
