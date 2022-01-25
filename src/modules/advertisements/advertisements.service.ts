import { CustormersService } from "./../custormers/custormers.service";
import { HandleError } from "src/common/error.response";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { Advertisement } from "./advertisment.entity";
import { Repository } from "typeorm";
import { EmailService } from "../service/email/email.service";
import * as moment from "moment";
import { HttpService } from "@nestjs/axios";
import { AdvertisementReqDto } from "./dto/req.dto";
import { AdvertisementType } from "./interface/advertisement.type";
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
    private httpService: HttpService
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

  async createAnAdvertisement(req: AdvertisementReqDto) {
    try {
      const { productId = "", saleId = "" } = req
      if (productId !== "") {
        const productData = await this.httpService.get(`https://laptrinhcautrucapi.herokuapp.com/product/id?id=${parseInt(productId)}`).toPromise()
        if (productData.status === 200) {
          const productDataUsing: { id: number; name: string; type: string; description: string; image: string } = productData.data[0]
          req.content = productDataUsing.description
          req.imageUrl = productDataUsing.image
        }
      }
      if (saleId !== "") {
        const saleData = await this.httpService.get(`https://ltct-sp19-api.herokuapp.com/api/sale/code/${saleId}`).toPromise()
        if (saleData.status === 200) {
          const codeDataUsing: { code: any } = saleData.data
          req.content = codeDataUsing.code.description
        }
      }
      const advertisementCreate = this.repo.create(req)
      return await this.repo.save(advertisementCreate)
    } catch (error) {
      error.message="Sản phẩm hoặc mã khuyến mại không tồn tại"
      error.status=404
      HandleError(error)
    }
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

  async getListTypeAdvertisement(){
    try {
      const listData = Object.values(AdvertisementType)
      return listData
    } catch (error) {
      HandleError(error)
    }
  }
}
