import { Roles } from './../auth/decorator/roles.decorator';
import { RolesGuard } from './../auth/guard/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { SendNotificatinWithOneSignal } from './dto/req.dto';
import { NotificationsService } from './notifications.service';
import { RoleEnum } from '../user/enum/user.enum';

@ApiTags("Notification - Thông báo")
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard)
@Roles(RoleEnum.ADMIN)
@Controller('notifications')
export class NotificationsController {
    constructor(
        public service: NotificationsService
    ) { }
    @Post("mockup")
    async sendNotificationTest(@Body() req: SendNotificatinWithOneSignal) {
        return await this.service.sendWithOneSignal(req)
    }
}
