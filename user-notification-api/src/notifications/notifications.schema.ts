import { Schema } from 'mongoose';

export const NotificationLogSchema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['marketing', 'newsletter', 'updates'], required: true },
  channel: { type: String, enum: ['email', 'sms', 'push'], required: true },
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  sentAt: { type: Date },
  failureReason: { type: String },
  metadata: { type: Object, default: {} },
});
