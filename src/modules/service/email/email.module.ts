import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../../../config/base.config";
import { AuthModule } from "../../auth/auth.module";
import { EmailService } from "./email.service";

@Module({
  providers: [EmailService],
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    forwardRef(() => AuthModule),
  ],
  exports: [EmailService],
})
export class EmailModule {}
