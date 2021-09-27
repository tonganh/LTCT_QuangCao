import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer/interceptors";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { UnauthorizedError } from "src/common/error.response";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";
import { ApiFile } from "./decorator/api-file.decorator";
import { PublicFileService } from "./public-file.service";

@ApiBearerAuth()
@ApiTags("public-files")
@Controller("public-files")
export class PublicFileController {
  constructor(private readonly publicFileService: PublicFileService) {}

  @UseGuards(JwtAuthGuard)
  @Post("upload")
  @ApiUnauthorizedResponse({
    type: UnauthorizedError,
  })
  @ApiOperation({
    summary: "Upload file",
  })
  @ApiConsumes("multipart/form-data")
  @ApiFile("file")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file) {
    return this.publicFileService.upload(file);
  }
}
