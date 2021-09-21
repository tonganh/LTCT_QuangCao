import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Username',
    example: 'quangdt',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Mật khẩu',
    example: '123',
  })
  @IsString()
  password: string;
}
