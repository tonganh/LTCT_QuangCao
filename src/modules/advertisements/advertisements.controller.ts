import { AuthGuard } from "@nestjs/passport";
import { AdvertisementsService } from "./advertisements.service";
import { Advertisement } from "./advertisment.entity";
import { Crud, CrudController } from "@nestjsx/crud";
import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "../auth/decorator/roles.decorator";
import { RoleEnum } from "../user/enum/user.enum";
import { AdvertisementReqDto } from "./dto/req.dto";

@ApiTags("Quảng cáo")
@Controller("advertisements")
@Crud({
  model: {
    type: Advertisement,
  },
  routes: {
    only: ["getOneBase", "getManyBase"],
  },
})
export class AdvertisementsController implements CrudController<Advertisement> {
  constructor(public service: AdvertisementsService) {}
}

@ApiTags("Quảng cáo")
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard)
@Roles(RoleEnum.ADMIN)
@Controller("advertisements")
@Crud({
  model: {
    type: Advertisement,
  },
  routes: {
    exclude: ["getOneBase", "getManyBase", "replaceOneBase"],
  },
  dto: {
    create: AdvertisementReqDto,
    update: AdvertisementReqDto,
  },
})
export class AdminAdvertisementsController
  implements CrudController<Advertisement>
{
  constructor(public service: AdvertisementsService) {}
}
