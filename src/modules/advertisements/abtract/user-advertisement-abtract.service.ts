import { CrudRequest } from "@nestjsx/crud"
import { Advertisement } from "../advertisment.entity"

export abstract class UserAdvertisementAbtractService {
    abstract getOneAdvertisement(req: CrudRequest): Promise<Advertisement>;
    abstract getManyAdvertisementWithTime(req: CrudRequest): any;
}
