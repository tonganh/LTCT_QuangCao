import { Custormers } from "./custormers.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CustormersController } from "./custormers.controller";
import { CustormersService } from "./custormers.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [CustormersController],
  providers: [CustormersService],
  imports: [TypeOrmModule.forFeature([Custormers]), AuthModule],
  exports: [CustormersService],
})
export class CustormersModule {}
