import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty()
  accessToken: string;
}
