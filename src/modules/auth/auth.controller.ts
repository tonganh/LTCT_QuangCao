import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { UnauthorizedError } from "src/common/error.response";
import { User } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { GetUser } from "./decorator/user.decorator";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { SignInResponse } from "./dto/sign-in.response";
import { JwtAuthGuard } from "./guard/jwt.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiCreatedResponse({
    type: SignInResponse,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedError,
  })
  @ApiOperation({
    summary: "Đăng nhập tài khoản bằng Telephone và Password",
  })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post("forgot-password")
  @HttpCode(200)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post("reset-password")
  @HttpCode(200)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("change-password")
  @ApiOperation({
    summary: "Đổi mật khẩu(Yêu cầu mật khẩu cũ)",
  })
  async changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return await this.authService.changePassword(user, changePasswordDto);
  }
}
