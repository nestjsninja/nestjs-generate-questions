import {
    Body,
    Controller,
    Param,
    Patch
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserUseCase } from '../use-case/update-user';

@Controller('/user')
@ApiTags('user')
export class UpdateUserController {
    constructor(private updateUserUseCase: UpdateUserUseCase) { }

    @ApiOkResponse({ type: UserDto })
    @Patch(':id')
    @ApiParam({ name: 'id' })
    handle(
        @Param('id') id,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.updateUserUseCase.execute(id, updateUserDto);
    }
}
