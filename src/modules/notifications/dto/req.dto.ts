import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationReq {
  @ApiProperty({ default: 'huy don hang' })
  title: string;

  @ApiProperty({ default: 'huy don hang' })
  content: string;
}


export class SendNotificatinWithOneSignal {
  @ApiProperty({ default: "Bạn có thông báo" })
  title: string

  @ApiProperty({ default: "Hệ thống của chúng tôi có thông báo dành cho bạn. Click để biết thêm chi tiết" })
  content: string

}
