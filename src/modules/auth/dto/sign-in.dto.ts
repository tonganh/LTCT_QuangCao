import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({
    description: "Tên đăng nhập",
    example: "anhtn",
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: "Mật khẩu",
    example: "123",
  })
  @IsString()
  password: string;
}
