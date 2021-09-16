import { BadRequestException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';
import { AbstractSoftDeleteEntity } from './entity/abstract.entity';
import { HandleError } from './error.response';

export class TypeOrmSoftDeleteCrudService<
  T extends AbstractSoftDeleteEntity
> extends TypeOrmCrudService<T> {
  constructor(public repo: Repository<T>) {
    super(repo);
  }

  async softDelete(id: any, admin: User) {
    try {
      const entity = await this.findOne(id);
      if (!entity) {
        throw new BadRequestException('Không tồn tại');
      }
      entity.softRemove();
      entity.deletedBy = admin.id;
      await entity.save();
      return {
        statusCode: 200,
        message: 'Xoá thành công',
      };
    } catch (error) {
      return HandleError(error);
    }
  }
}
