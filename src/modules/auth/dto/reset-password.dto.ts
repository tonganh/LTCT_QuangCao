import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF1YW5nZHQuZGV2QGdtYWlsLmNvbSIsImlhdCI6MTYwNjcyNzkyMywiZXhwIjoxNjA3MzMyNzIzfQ.hE2mSddp6dbQawGMNp3NAf8ic09E7F2VdAN6C1euEWg',
  })
  @IsString()
  resetToken: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  newPassword: string;
}
