import { HandleError } from "./../../common/error.response";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { Custormers } from "./custormers.entity";
import { Repository } from "typeorm";
import { RegisterReceiveEmail, UnRegisterReceiveEmail } from "./dto";

@Injectable()
export class CustormersService extends TypeOrmCrudService<Custormers> {
  constructor(
    @InjectRepository(Custormers)
    public repo: Repository<Custormers>,
  ) {
    super(repo);
  }

  async registerReceiveAdvertisement(req: RegisterReceiveEmail) {
    try {
      const custormerExisted = await this.repo.findOne({ email: req.email });
      if (custormerExisted) {
        custormerExisted.receiveEmail = true;
        await this.repo.save(custormerExisted);
      } else {
        const custormer = this.repo.create({ ...req, receiveEmail: true });
        await this.repo.save(custormer);
      }
      return { message: "Successfull" };
    } catch (error) {
      HandleError(error);
    }
  }

  async unReceiveAdvertisement(req: UnRegisterReceiveEmail) {
    try {
      const custormer = await this.repo.findOne({ email: req.email });
      if (!custormer) {
        return { message: "You have not exist in database" };
      }
      custormer.receiveEmail = false;
      await this.repo.save(custormer);
      return { message: "Successfull" };
    } catch (error) {
      HandleError(error);
    }
  }

  async getListWantReceiveAdvertisement() {
    const listCustormers = await this.repo.find({
      where: { receiveEmail: true },
      select: ["email", "name"],
    });
    return listCustormers;
  }
}
