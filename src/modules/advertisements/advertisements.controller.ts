import { AuthGuard } from "@nestjs/passport";
import { AdvertisementsService } from "./advertisements.service";
import { Advertisement } from "./advertisment.entity";
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from "@nestjsx/crud";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "../auth/decorator/roles.decorator";
import { RoleEnum } from "../user/enum/user.enum";
import { AdvertisementReqDto, ContentSendMail } from "./dto/req.dto";

@ApiTags("For all users - Quảng cáo")
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

  @Override("getOneBase")
  async getOneAdvertisementTest(@ParsedRequest() req: CrudRequest) {
    return this.service.getOneAdvertisementTest(req);
  }
}

@ApiTags("Admin - Quảng cáo")
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard)
@Roles(RoleEnum.ADMIN)
@Controller("admin/advertisements")
@Crud({
  model: {
    type: Advertisement,
  },
  routes: {
    exclude: ["replaceOneBase"],
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

  @Post("send-mail")
  async sendMailToCustormer(@Body() req: ContentSendMail) {
    return await this.service.sendMailAdvertisementToCustormer(req.content);
  }
}
