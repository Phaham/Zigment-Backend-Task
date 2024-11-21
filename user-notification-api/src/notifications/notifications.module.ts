import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationLogSchema } from './notifications.schema';
import { StatisticsService } from './statistics.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'NotificationLog', schema: NotificationLogSchema }]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, StatisticsService],
})
export class NotificationsModule {}
