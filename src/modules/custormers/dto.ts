import { ApiProperty } from "@nestjs/swagger";
export class CUCustormerReq {
  @ApiProperty({ default: "Tống Ngọc Anh" })
  name: string;

  @ApiProperty({ default: "tongngocnahcampha@gmail.com" })
  email: string;

  @ApiProperty({ default: true })
  receiveEmail: boolean;
}

export class RegisterReceiveEmail {
  @ApiProperty({ default: "Tống Ngọc Anh" })
  name: string;

  @ApiProperty({ default: "tongngocnahcampha@gmail.com" })
  email: string;
}

export class UnRegisterReceiveEmail {
  @ApiProperty({ default: "tongngocnahcampha@gmail.com" })
  email: string;
}
