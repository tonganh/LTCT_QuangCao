import { ApiProperty } from '@nestjs/swagger';
export class RegisterAccountReq {
  @ApiProperty({ example: 'lovehangga' })
  username: string;

  @ApiProperty({ example: 'lovehangga' })
  password: string;
}
