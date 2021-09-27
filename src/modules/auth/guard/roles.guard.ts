import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleEnum } from "../../user/enum/user.enum";
import { User } from "../../user/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesClass =
      this.reflector.get<RoleEnum[]>("roles", context.getClass()) || [];

    const rolesFunc =
      this.reflector.get<RoleEnum[]>("roles", context.getHandler()) || [];

    const roles: RoleEnum[] = [...rolesClass, ...rolesFunc];
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user: User = request.user;
    if (roles.indexOf(user.role) !== -1) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
