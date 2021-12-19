import { CustormersModule } from "./modules/custormers/custormers.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { PublicFileModule } from "./modules/public-file/public-file.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { ServiceModule } from "./modules/service/service.module";
import { AdvertisementsModule } from "./modules/advertisements/advertisements.module";
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    PublicFileModule,
    ServiceModule,
    AdvertisementsModule,
    CustormersModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
