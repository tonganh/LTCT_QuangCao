import { Advertisement } from "./advertisment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AdvertisementsService } from "./advertisements.service";
import {
  AdminAdvertisementsController,
  AdvertisementsController,
} from "./advertisements.controller";
import { AuthModule } from "../auth/auth.module";
import { EmailModule } from "../service/email/email.module";

@Module({
  providers: [AdvertisementsService],
  controllers: [AdvertisementsController, AdminAdvertisementsController],
  imports: [TypeOrmModule.forFeature([Advertisement]), AuthModule, EmailModule],
})
export class AdvertisementsModule {}
