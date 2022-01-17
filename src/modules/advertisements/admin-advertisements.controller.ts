import { AuthGuard } from "@nestjs/passport";
import { AdminAdvertisementsService } from "./advertisements.service";
import { Advertisement } from "./advertisment.entity";
import {
  Crud,
  CrudController,
  Override,
} from "@nestjsx/crud";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "../auth/decorator/roles.decorator";
import { RoleEnum } from "../user/enum/user.enum";
import { AdvertisementReqDto, ContentSendMail } from "./dto/req.dto";


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
    update: AdvertisementReqDto,
  },
})
export class AdminAdvertisementsController
  implements CrudController<Advertisement>
{
  constructor(public service: AdminAdvertisementsService) { }

  @Override("createOneBase")
  async adminCreateAdvertisement(@Body() req: AdvertisementReqDto) {
    return await this.service.createAnAdvertisement(req)
  }

  @Post("send-mail")
  async sendMailToCustormer(@Body() req: ContentSendMail) {
    return await this.service.sendMailAdvertisementToCustormer(req.content);
  }
}
