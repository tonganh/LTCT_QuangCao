import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { HandleError } from "src/common/error.response";
import { Connection, In, Repository } from "typeorm";
import * as faker from "faker";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { BadRequestException } from "@nestjs/common";
import { ChangePasswordReqDto, UpdateSelfUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private connection: Connection
  ) {
    super(userRepo);
  }

  private readonly logger = new Logger(UserService.name);

  async getUserById(id: number) {
    return await this.userRepo.findOne(id);
  }

  async getProfile(user: User) {
    return this.userRepo.findOne({
      id: user.id,
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existedUserByUsername = await this.repo.findOne({
        username: createUserDto.username,
      });
      if (existedUserByUsername) {
        throw new ConflictException("username");
      }
      const existedUserByEmail = await this.repo.findOne({
        email: createUserDto.email,
      });
      if (existedUserByEmail) {
        throw new ConflictException("email");
      }
      const user = this.repo.create(createUserDto);
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(createUserDto.password, user.salt);
      const savedUser = await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return savedUser;
    } catch (error) {
      this.logger.error(`createUser:${JSON.stringify(error)}`);
      await queryRunner.rollbackTransaction();
      return HandleError(error);
    } finally {
      await queryRunner.release();
    }
  }

  async resetUserPassword(user: User) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (!user) {
        throw new BadRequestException("User không tồn tại");
      }
      const password = faker.internet.password(8);
      user.password = await bcrypt.hash(password, user.salt);
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return {
        message: "Đã gửi Email mật khẩu mới",
      };
    } catch (error) {
      this.logger.error(`resetUserPassword:${JSON.stringify(error)}`);
      await queryRunner.rollbackTransaction();
      return HandleError(error);
    } finally {
      await queryRunner.release();
    }
  }

  async toggleBlockUser(user: User, admin: User) {
    try {
      if (!user) {
        throw new BadRequestException("User không tồn tại");
      }
      user.isBlocked = !user.isBlocked;
      user.blockedAt = user.isBlocked ? new Date() : null;
      user.blockedBy = user.isBlocked ? admin.id : null;
      await user.save();
      return {
        statusCode: 200,
        message: user.isBlocked ? "Block thành công" : "Đả bỏ block User",
      };
    } catch (error) {
      return HandleError(error);
    }
  }

  async deleteUser(user: User, admin: User) {
    try {
      if (!user) {
        throw new BadRequestException("User không tồn tại");
      }
      if (user.deletedAt) {
        throw new BadRequestException("User đã bị xoá");
      }
      user.softRemove();
      user.deletedBy = admin.id;
      await user.save();
      return {
        statusCode: 200,
        message: "Xoá thành công",
      };
    } catch (error) {
      return HandleError(error);
    }
  }

  async deleteManyUser(ids: number[], admin: User) {
    try {
      const res = await this.userRepo.update(
        {
          id: In(ids),
          deletedAt: null,
        },
        {
          deletedBy: admin.id,
          deletedAt: new Date(),
        }
      );
      return {
        message: `Đã xoá ${res.affected} người dùng`,
      };
    } catch (error) {
      return HandleError(error);
    } finally {
    }
  }

  async updateSelftInformation(user: User, data: UpdateSelfUserDto) {
    try {
      const { fullName } = data;
      user.fullName = fullName;
      await user.save();
      return user;
    } catch (error) {
      HandleError(error);
    }
  }

  async changePassword(user: User, data: ChangePasswordReqDto) {
    const userInformation = await this.repo.findOne({ id: user.id });

    try {
      const { password } = data;
      user.password = await bcrypt.hash(password, userInformation.salt);
      await user.save();
      return user;
    } catch (error) {
      HandleError(error);
    }
  }
}
