import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './interfaces/notification-log.interface';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('NotificationLog') private readonly notificationLogModel: Model<NotificationLog>,
  ) {}

  async sendNotification(sendNotificationDto: SendNotificationDto): Promise<NotificationLog> {
    // Simulate sending notification
    const isSuccess = Math.random() > 0.2; // 80% chance of success

    const newLog = new this.notificationLogModel({
      userId: sendNotificationDto.userId,
      type: sendNotificationDto.type,
      channel: sendNotificationDto.channel,
      status: isSuccess ? 'sent' : 'failed',
      sentAt: isSuccess ? new Date() : undefined,
      failureReason: isSuccess ? undefined : 'Simulated failure',
      metadata: sendNotificationDto.content,
    });

    return newLog.save();
  }
  
  async getLogsByUserId(userId: string): Promise<NotificationLog[]> {
    return this.notificationLogModel.find({ userId });
  }
}
