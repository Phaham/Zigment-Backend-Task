// src/notifications/statistics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './interfaces/notification-log.interface';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel('NotificationLog') private readonly notificationLogModel: Model<NotificationLog>,
  ) {}

  async getStatistics() {
    const totalNotifications = await this.notificationLogModel.countDocuments();
    const sentNotifications = await this.notificationLogModel.countDocuments({ status: 'sent' });
    const failedNotifications = await this.notificationLogModel.countDocuments({ status: 'failed' });

    return {
      totalNotifications,
      sentNotifications,
      failedNotifications,
    };
  }
}
