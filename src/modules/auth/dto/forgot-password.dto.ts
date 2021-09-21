import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'johndoe@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'http://ftu.2soft.top/',
  })
  @IsString()
  returnUrl: string;
}
