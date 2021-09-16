import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';
import { RoleEnum } from '../enum/user.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsInt()
  facilityId: number;

  @ApiProperty()
  @IsInt()
  unitId: number;

  @ApiProperty({
    type: 'enum',
    enum: RoleEnum,
  })
  role: RoleEnum;
}
