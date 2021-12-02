import { HandleError } from "src/common/error.response";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { Advertisement } from "./advertisment.entity";
import { Repository } from "typeorm";
import { EmailService } from "../service/email/email.service";

@Injectable()
export class AdvertisementsService extends TypeOrmCrudService<Advertisement> {
  constructor(
    @InjectRepository(Advertisement)
    public repo: Repository<Advertisement>,
    public emailService: EmailService,
  ) {
    super(repo);
  }

  async sendMailToCustormer(content: string) {
    try {
      const usernames = [
        "ngocdiem5102000@gmail.com",
        "anhbum2000@gmail.com",
        "haiprovip1102@gmail.com",
        "tongngocanhcampha@gmail.com",
      ];
      await this.emailService.sendAdvertisement(usernames, content);
      return { message: "Successfull" };
    } catch (error) {
      HandleError(error);
    }
  }
}
