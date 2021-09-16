import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestError {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;

  @ApiProperty()
  message: any;
}

export class ConflictError {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;

  @ApiProperty()
  message: any;
}
export class UnauthorizedError {
  @ApiProperty({
    example: 401,
  })
  statusCode: number;

  @ApiProperty()
  message: any;
}

export const HandleError = (error) => {
  console.log('==========');
  console.log('Error:', error);
  console.log('==========');

  throw new HttpException(
    error.message || 'Có lỗi xảy ra',
    error.status || 500,
  );
};
