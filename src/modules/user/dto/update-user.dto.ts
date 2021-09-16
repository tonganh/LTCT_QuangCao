import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class UpdateUseDto {
  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsInt()
  facilityId: number;

  @ApiProperty()
  @IsInt()
  unitId: number;
}

export class UpdateSelfUserDto {
  @ApiProperty({ default: 'hoangNM' })
  @IsString()
  fullName: string;

  @ApiPropertyOptional({ default: 'test123' })
  image: string;
}

export class ChangePasswordReqDto {
  @ApiProperty({ default: 'testPassword' })
  @IsString()
  password: string;
}
