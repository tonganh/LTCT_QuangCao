import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtConfig } from "../../config/base.config";
import { EmailModule } from "../service/email/email.module";
import { User } from "../user/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { TokenService } from "./token.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    EmailModule,
  ],
  exports: [AuthService, TokenService, JwtModule, PassportModule],
})
export class AuthModule {}
