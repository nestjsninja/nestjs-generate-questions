import {
    Controller,
    Delete,
    Param
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUserUseCase } from '../use-case/delete-user';

@Controller('/user')
@ApiTags('user')
export class DeleteUserController {
    constructor(private deleteUserUseCase: DeleteUserUseCase) { }

    @Delete(':id')
    handle(@Param('id') id: string) {
        return this.deleteUserUseCase.execute(id);
    }
}
