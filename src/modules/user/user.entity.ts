import { AbstractSoftDeleteEntity } from 'src/common/entity/abstract.entity';
import * as bcrypt from 'bcryptjs';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;
@Entity('users')
export class User extends AbstractSoftDeleteEntity {
  @Column({
    name: 'full_name',
  })
  fullName: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    name: 'role_key',
  })
  role: string;

  @Exclude()
  @Column()
  salt: string;

  @IsEmpty({ groups: [CREATE, UPDATE], message: 'Không hợp lệ' })
  @Column({
    type: 'boolean',
    name: 'is_blocked',
    default: false,
  })
  isBlocked: boolean;

  @Exclude()
  @IsEmpty({ groups: [CREATE, UPDATE], message: 'Không hợp lệ' })
  @Column({
    type: 'timestamptz',
    name: 'blocked_at',
    default: null,
  })
  blockedAt: Date;

  @Exclude()
  @IsEmpty({ groups: [CREATE, UPDATE], message: 'Không hợp lệ' })
  @Column({
    name: 'blocked_by',
    default: null,
  })
  blockedBy: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'blocked_by',
  })
  blockedByUser: User;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
