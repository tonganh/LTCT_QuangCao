import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HandleError } from "src/common/error.response";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import * as bcrypt from "bcryptjs";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { SignInResponse } from "./dto/sign-in.response";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { TokenService } from "./token.service";
import { EmailService } from "../service/email/email.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private tokenService: TokenService,
    private emailService: EmailService
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUserPassword(signInDto: SignInDto): Promise<User> {
    const { username, password } = signInDto;
    const user = await this.userRepo.findOne({
      where: { username },
      select: ["email", "fullName", "id", "role", "salt", "password"],
    });
    if (!user) {
      throw new BadRequestException("Tài khoản không tồn tại");
    }
    if (await user.validatePassword(password)) {
      return user;
    } else {
      throw new BadRequestException("Sai mật khẩu");
    }
  }

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    try {
      const user = await this.validateUserPassword(signInDto);
      const signInResponse: SignInResponse = {
        accessToken: this.tokenService.signLoginToken(user),
      };
      return signInResponse;
    } catch (error) {
      this.logger.error(`signIn:${JSON.stringify(error)}`);
      return HandleError(error);
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email, returnUrl } = forgotPasswordDto;
    try {
      const user = await this.userRepo.findOne({ email });
      if (!user) {
        throw new BadRequestException("Không tồn tại User");
      }
      await this.emailService.sendForgotPasswordEmail(user, returnUrl);
      return {
        message: "Đã gửi Email đặt lại mật khẩu",
      };
    } catch (error) {
      this.logger.error(`forgotPassword:${JSON.stringify(error)}`);
      return HandleError(error);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { resetToken, newPassword } = resetPasswordDto;
    try {
      const payload: any = this.tokenService.decodeToken(resetToken);
      if (!payload || !payload.email) {
        throw new BadRequestException("Thông tin không hợp lệ");
      }
      const user = await this.userRepo.findOne({
        select: ["salt", "id"],
        where: {
          id: payload.id,
        },
      });
      if (!user) {
        throw new BadRequestException("Thông tin không hợp lệ");
      }
      user.password = await bcrypt.hash(newPassword, user.salt);
      await user.save();
      return {
        message: "Đổi mật khẩu thành công",
      };
    } catch (error) {
      this.logger.error(`resetPassword:${JSON.stringify(error)}`);
      return HandleError(error);
    }
  }

  async changePassword(user: User, changePasswordDto: ChangePasswordDto) {
    try {
      const basicUser = await this.userRepo.findOne({
        select: ["id", "password", "salt"],
        where: {
          id: user.id,
        },
      });
      if (!(await basicUser.validatePassword(changePasswordDto.oldPassword))) {
        throw new BadRequestException("Mật khẩu cũ không đúng");
      }
      const newPassword = await bcrypt.hash(
        changePasswordDto.newPassword,
        basicUser.salt
      );
      basicUser.password = newPassword;
      await basicUser.save();
      return {
        message: "Đổi mật khẩu thành công",
      };
    } catch (error) {
      this.logger.error(`changePassword:${JSON.stringify(error)}`);
      return HandleError(error);
    }
  }
}
