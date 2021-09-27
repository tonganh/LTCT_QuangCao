import { Module } from "@nestjs/common";
import { PublicFileService } from "./public-file.service";
import { PublicFileController } from "./public-file.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [PublicFileService],
  controllers: [PublicFileController],
  imports: [AuthModule],
})
export class PublicFileModule {}
