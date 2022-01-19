import { CustormersService } from "./../custormers/custormers.service";
import { HandleError } from "src/common/error.response";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { Advertisement } from "./advertisment.entity";
import { Repository } from "typeorm";
import { EmailService } from "../service/email/email.service";
import { CrudRequest, Override } from "@nestjsx/crud";
import * as moment from "moment";
import { UserAdvertisementAbtractService } from "./abtract/user-advertisement-abtract.service";
interface UserAdvertisementInterface {
    getOneAdvertisement(req: CrudRequest): Promise<Advertisement>;
    getManyAdvertisementWithTime(req: CrudRequest): any;
}

@Injectable()
export class UserAdvertisementsService
    extends TypeOrmCrudService<Advertisement>
    implements UserAdvertisementInterface, UserAdvertisementAbtractService {
    constructor(
        @InjectRepository(Advertisement)
        public repo: Repository<Advertisement>,
        public emailService: EmailService,
        public custormerService: CustormersService,
    ) {
        super(repo);
    }

    get base(): TypeOrmCrudService<Advertisement> {
        return this;
    }

    @Override("getOneBase")
    async getOneAdvertisement(req: CrudRequest): Promise<Advertisement> {
        const data = await this.base.getOne(req);
        data.accessNumber++;
        await this.repo.save(data);
        delete data.accessNumber;
        return data;
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

    async getManyAdvertisementWithTime(req: CrudRequest) {
        try {
            const { parsed, options } = req;
            let builder = await this.createBuilder(parsed, options);
            builder
                .andWhere(`${this.alias}.startAt <= :fromDate`, {
                    fromDate: this.currentDate,
                })
                .andWhere(`${this.alias}.endAt >= :toDate`, {
                    toDate: this.currentDate,
                });
            const data = await this.doGetMany(builder, parsed, options);
            return data;
        } catch (error) {
            HandleError(error);
        }
    }
}
