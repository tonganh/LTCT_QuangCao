import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @ApiProperty({
    description: 'Mật khẩu cũ',
  })
  oldPassword: string;

  @IsString()
  @ApiProperty({
    description: 'Mật khẩu mới',
  })
  newPassword: string;
}
