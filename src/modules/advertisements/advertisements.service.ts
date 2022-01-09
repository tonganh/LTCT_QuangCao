import { CustormersService } from "./../custormers/custormers.service";
import { HandleError } from "src/common/error.response";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { Advertisement } from "./advertisment.entity";
import { Repository } from "typeorm";
import { EmailService } from "../service/email/email.service";
import * as moment from "moment";
interface AdminAdvertisementInterface {
  sendMailAdvertisementToCustormer(content: string): any
}
@Injectable()
export class AdminAdvertisementsService
  extends TypeOrmCrudService<Advertisement> implements AdminAdvertisementInterface {
  constructor(
    @InjectRepository(Advertisement)
    public repo: Repository<Advertisement>,
    public emailService: EmailService,
    public custormerService: CustormersService,
  ) {
    super(repo);
  }
  get currentDate() {
    const today = new Date();
    const day = today.getDate(); // 24
    const month = today.getMonth() + 1; // 10 (Month is 0-based, so 10 means 11th Month)
    const year = today.getFullYear(); // 2020
    const currentDay = `${day}-${month}-${year}`;
    const fromDate = moment(
      `${currentDay} 00:00:00`,
      "DD-MM-YYYY hh:mm:ss",
    ).format("YYYY-MM-DD HH:mm:ss");
    return fromDate;
  }

  async sendMailAdvertisementToCustormer(content: string) {
    try {
      const custormers =
        await this.custormerService.getListWantReceiveAdvertisement();
      await this.emailService.sendAdvertisement(custormers, content);
      return { message: "Successfull" };
    } catch (error) {
      HandleError(error);
    }
  }
}
