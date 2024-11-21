import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { StatisticsService } from './statistics.service';


@Controller('api/notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Post('send')
  sendNotification(@Body() sendNotificationDto: SendNotificationDto) {
    return this.notificationsService.sendNotification(sendNotificationDto);
  }

  @Get('stats')
  getStatistics() {
    return this.statisticsService.getStatistics();
  }
}
