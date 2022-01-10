import { CustormersModule } from "./../custormers/custormers.module";
import { Advertisement } from "./advertisment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AdminAdvertisementsService } from "./advertisements.service";
import {
  AdminAdvertisementsController,
} from "./admin-advertisements.controller";
import { AuthModule } from "../auth/auth.module";
import { EmailModule } from "../service/email/email.module";
import { UserAdvertisementsController } from "./user-advertisement.controller";
import { UserAdvertisementsService } from "./user-advertisement.service";
import { UserAdvertisementAbtractService } from "./abtract/user-advertisement-abtract.service";

@Module({
  providers: [AdminAdvertisementsService, { provide: UserAdvertisementAbtractService, useClass: UserAdvertisementsService }],
  controllers: [UserAdvertisementsController, AdminAdvertisementsController],
  imports: [
    TypeOrmModule.forFeature([Advertisement]),
    AuthModule,
    EmailModule,
    CustormersModule,
  ],
})
export class AdvertisementsModule { }
