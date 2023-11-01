import {
    Controller,
    Get,
    Param
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { GetUserByIdUseCase } from '../use-case/get-user-by-id';

@Controller('/user')
@ApiTags('user')
export class GetUserByIdController {
    constructor(private getUserByIdUseCase: GetUserByIdUseCase) { }

    @ApiOkResponse({ type: UserDto })
    @Get(':id')
    handle(@Param('id') id: string) {
        return this.getUserByIdUseCase.execute(id);
    }
}
