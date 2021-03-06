import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { RoleEnum } from "../enum/user.enum";

export class CreateUserDto {
  @ApiProperty({ default: "anhtn" })
  @IsString()
  username: string;

  @ApiProperty({ default: "Tong Ngoc Anh" })
  @IsString()
  fullName: string;

  @ApiProperty({ default: "anh.tndev40@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ default: "123" })
  @IsString()
  password: string;

  @ApiProperty({
    type: "enum",
    enum: RoleEnum,
  })
  role: RoleEnum;
}
