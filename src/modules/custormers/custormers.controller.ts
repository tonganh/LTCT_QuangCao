import {
  CUCustormerReq,
  RegisterReceiveEmail,
  UnRegisterReceiveEmail,
} from "./dto";
import { CustormersService } from "./custormers.service";
import { Custormers } from "./custormers.entity";
import { Crud, CrudController } from "@nestjsx/crud";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../auth/decorator/roles.decorator";
import { RolesGuard } from "../auth/guard/roles.guard";
import { RoleEnum } from "../user/enum/user.enum";

@ApiTags("Custormers - Khách hàng")
@Controller("custormers")
@Crud({
  model: {
    type: Custormers,
  },
  routes: {
    exclude: ["replaceOneBase"],
  },
  dto: {
    create: CUCustormerReq,
    update: CUCustormerReq,
  },
})
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard)
@Roles(RoleEnum.ADMIN)
export class CustormersController implements CrudController<Custormers> {
  constructor(public service: CustormersService) {}

  @Post("register-receive-email")
  async registerReceiveAdvertisement(@Body() req: RegisterReceiveEmail) {
    return await this.service.registerReceiveAdvertisement(req);
  }

  @Post("un-receive-email")
  async unReceiveAdvertisement(@Body() req: UnRegisterReceiveEmail) {
    return await this.service.unReceiveAdvertisement(req);
  }
}
