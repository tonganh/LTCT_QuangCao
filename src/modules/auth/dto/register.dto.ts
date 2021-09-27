import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ default: "anhtn" })
  @IsString()
  fullName: string;

  @ApiProperty({ default: "anh.tndev40@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ default: "123" })
  @IsString()
  password: string;
}
