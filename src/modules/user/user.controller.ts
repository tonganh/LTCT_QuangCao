import { Delete, HttpCode, Param, Patch, Query } from "@nestjs/common";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { GetUser } from "../auth/decorator/user.decorator";
import { AdminGuard } from "../auth/guard/admin.guard";
import { JwtAuthGuard } from "../auth/guard/jwt.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  ChangePasswordReqDto,
  UpdateSelfUserDto,
  UpdateUseDto,
} from "./dto/update-user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Crud({
  model: {
    type: User,
  },
  routes: {
    only: ["getManyBase", "updateOneBase", "getOneBase"],
  },
  dto: {
    update: UpdateUseDto,
  },
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("user")
@Controller("users")
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @ApiOperation({
    summary: "Thông tin tài khoản",
  })
  @Get("/profile")
  async getProfile(@GetUser() user: User) {
    return await this.service.getProfile(user);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: "Tạo tài khoản",
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.service.createUser(createUserDto);
  }

  @UseGuards(AdminGuard)
  @Patch(":id/reset-password")
  async resetUserPassword(@Param("id") id: number) {
    const user = await this.service.getUserById(id);
    return await this.service.resetUserPassword(user);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: "Block tài khoản",
  })
  @Post(":id/block")
  @HttpCode(200)
  async blockUser(@Param("id") id: number, @GetUser() admin: User) {
    const user = await this.service.getUserById(id);
    return this.service.toggleBlockUser(user, admin);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: "Xoá tài khoản",
  })
  @Delete(":id")
  @HttpCode(200)
  async deleteUser(@Param("id") id: number, @GetUser() admin: User) {
    const user = await this.service.getUserById(id);
    return this.service.deleteUser(user, admin);
  }

  @UseGuards(AdminGuard)
  @Delete()
  @ApiOperation({
    summary: "Xoá nhiều tài khoản",
  })
  @ApiQuery({
    name: "id",
    type: "integer",
    isArray: true,
    required: true,
  })
  async deleteMany(@Query("id") ids: number[], @GetUser() admin: User) {
    if (ids.length > 1) {
      return await this.service.deleteManyUser(ids, admin);
    } else {
      const user = await this.service.getUserById(ids[0]);
      return await this.service.deleteUser(user, admin);
    }
  }

  @ApiOperation({
    summary: "Cập nhật thông tin cá nhân",
  })
  @Post("/update-self-information")
  async updateSeflInformation(
    @GetUser() user: User,
    @Body() data: UpdateSelfUserDto,
  ) {
    return await this.service.updateSelftInformation(user, data);
  }

  @ApiOperation({
    summary: "Thay đổi mật khẩu",
  })
  @Post("/change-password")
  async changePassword(
    @GetUser() user: User,
    @Body() data: ChangePasswordReqDto,
  ) {
    return await this.service.changePassword(user, data);
  }
}
