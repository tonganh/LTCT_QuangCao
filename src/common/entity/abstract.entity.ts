import { CrudValidationGroups } from '@nestjsx/crud';
import { Exclude } from 'class-transformer';
import { IsEmpty } from 'class-validator';
import { Column } from 'typeorm';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

const { CREATE, UPDATE } = CrudValidationGroups;

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
export abstract class AbstractSoftDeleteEntity extends AbstractEntity {
  @Exclude()
  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    default: null,
    nullable: true,
  })
  deletedAt: Date;

  @Exclude()
  @IsEmpty({ groups: [CREATE, UPDATE], message: 'Không hợp lệ' })
  @Column({
    name: 'deleted_by',
    default: null,
  })
  deletedBy: number;
}
