import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { Advertisement } from "./advertisment.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdvertisementsService extends TypeOrmCrudService<Advertisement> {
  constructor(
    @InjectRepository(Advertisement)
    public repo: Repository<Advertisement>,
  ) {
    super(repo);
  }
}
