import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController, Override, ParsedRequest, CrudRequest } from "@nestjsx/crud";
import { Advertisement } from "./advertisment.entity";
import { UserAdvertisementsService } from "./user-advertisement.service";

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
export class UserAdvertisementsController implements CrudController<Advertisement> {
    constructor(public service: UserAdvertisementsService) { }
    @Override("getOneBase")
    async getOneAdvertisementTest(@ParsedRequest() req: CrudRequest) {
        return await this.service.getOneAdvertisement(req);
    }

    @Override("getManyBase")
    async getManyAdvertisementWithTime(@ParsedRequest() req: CrudRequest) {
        return await this.service.getManyAdvertisementWithTime(req);
    }
}
