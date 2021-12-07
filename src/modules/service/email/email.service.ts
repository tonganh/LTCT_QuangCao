import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import * as SendGridMail from "@sendgrid/mail";
import * as ejs from "ejs";
import { readFileSync } from "fs";
import { sendGridConfig } from "src/config/base.config";
import { TokenService } from "../../auth/token.service";
import { User } from "../../user/user.entity";
import * as path from "path";
@Injectable()
export class EmailService {
  constructor(private tokenService: TokenService) {
    SendGridMail.setApiKey(sendGridConfig.apiKey);
  }

  private readonly sendGridClient = SendGridMail;

  /**
   * Dùng Sendgrid để gửi Email
   *
   * @param template : Tên của file template, template đặt trong src/resources/templates/
   * @param to : Email của người nhận
   * @param subject : Tiêu đề ngắn
   * @param text : Tiêu đề dài
   * @param data : Data truyền vào để render template
   *
   * @throws: BadGatewayException khi không tìm thấy Template hoặc có lỗi từ Sendgrid
   */
  async send(
    template: string,
    subject: string,
    text: string,
    to: string,
    data: any,
  ) {
    const htmlString = readFileSync(
      __dirname + `/../../../resources/templates/${template}.ejs`,
      "utf-8",
    );
    if (!htmlString) {
      throw new BadGatewayException("Không tìm thấy template");
    }
    try {
      await this.sendGridClient.send({
        to,
        from: "info@2soft.top",
        subject,
        text,
        html: ejs.render(htmlString, data),
      });
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  async sendForgotPasswordEmail(user: User, returnUrl: string): Promise<any> {
    const dirLink = path.join(
      __dirname,
      "../../../resources/templates/reset-password.ejs",
    );
    const htmlString = readFileSync(dirLink, "utf-8");
    try {
      await this.sendGridClient.send({
        to: `${user.email}`,
        from: "info@2soft.top",
        subject: "Đặt lại mật khẩu",
        text: `Đặt lại mật khẩu`,
        html: ejs.render(htmlString, {
          reset_url: `${returnUrl}?token=${this.tokenService.signResetPasswordToken(
            user,
          )}`,
        }),
      });
    } catch (error) {
      throw new BadRequestException("Có lỗi khi gửi Email đặt lại mật khẩu");
    }
  }

  async sendResetPasswordEmail(user: User, password: string): Promise<any> {
    const htmlString = readFileSync(
      __dirname + "/../../resources/templates/admin-reset-user-password.ejs",
      "utf-8",
    );
    try {
      await this.sendGridClient.send({
        to: user.email,
        from: "info@2soft.top",
        subject: "Cài lại mật khẩu",
        text: `Cài lại mật khẩu`,
        html: ejs.render(htmlString, {
          password: password,
        }),
      });
    } catch (error) {
      throw new BadRequestException("Có lỗi khi gửi Email reset mật khẩu");
    }
  }

  // async sendAdvertisement(usernames: string[], content: string): Promise<any> {
  //   const htmlString = readFileSync(
  //     __dirname + "/../../../resources/templates/advertisement.ejs",
  //     "utf-8",
  //   );
  //   try {
  //     await Promise.all(
  //       usernames.map(async (username) => {
  //         await this.sendGridClient.send({
  //           to: username,
  //           from: "info@2soft.top",
  //           subject: "Thông báo về quảng cáo",
  //           text: `Thông báo về quảng cáo`,
  //           html: ejs.render(htmlString, {
  //             content,
  //           }),
  //         });
  //       }),
  //     );
  //   } catch (error) {
  //     throw new BadRequestException("Có lỗi khi gửi Email reset mật khẩu");
  //   }
  // }

  async sendAdvertisement(usernames: string[], content: string): Promise<any> {
    try {
      await Promise.all(
        usernames.map(async (username) => {
          await this.send(
            "advertisement",
            "Thông báo về quảng cáo",
            "Thông báo về quảng cáo",
            username,
            { content },
          );
        }),
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: email.service.ts ~ line 140 ~ EmailService ~ sendAdvertisement ~ error",
        error,
      );
      throw new BadRequestException("Có lỗi khi gửi Email reset mật khẩu");
    }
  }
}
