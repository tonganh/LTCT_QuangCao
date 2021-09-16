import { UseGuards, Delete, HttpCode, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GetUser } from 'src/modules/auth/decorator/user.decorator';
import { User } from 'src/modules/user/user.entity';
import { AdminGuard } from '../modules/auth/guard/admin.guard';
import { AbstractSoftDeleteEntity } from './entity/abstract.entity';
import { TypeOrmSoftDeleteCrudService } from './soft-delete-crud.service';

export class TypeOrmSoftDeleteCrudController<
  T extends AbstractSoftDeleteEntity,
> {
  constructor(public service: TypeOrmSoftDeleteCrudService<T>) {}

  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Xoá',
  })
  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id') id: number, @GetUser() admin: User) {
    return this.service.softDelete(id, admin);
  }
}
