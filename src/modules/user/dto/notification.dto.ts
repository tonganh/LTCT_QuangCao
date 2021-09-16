import { ApiProperty } from '@nestjs/swagger';

export class GetDeviceTokenReq {
  @ApiProperty({ default: 'lalalala' })
  device_token: string;
}
