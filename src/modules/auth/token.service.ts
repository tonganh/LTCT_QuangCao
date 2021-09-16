import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { RegisterAccountReq } from './dto/req.dto';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  signLoginToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  signResetPasswordToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
    });
  }
}
