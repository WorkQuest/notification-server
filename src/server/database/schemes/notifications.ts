import * as Joi from 'joi';
import {
  booleanSchema,
  countSchema,
  isoDateSchema,
  queueNameSchema,
  uuidArraySchema,
  uuidSchema,
} from './common';

export const notificationActionSchema = Joi.string()
  .example('questStarted')
  .label('NotificationAction');
export const notificationDataSchema = Joi.object()
  .example({
    id: '84e269ea-bbf2-4f54-b5a8-40ae27b2f8af',
    user: {
      id: '9cfadf5f-1b6d-4a0d-93f9-0df3e3b9b12d',
      avatar: null,
      lastName: 'cSr',
      firstName: 'cSr',
    },
  })
  .label('NotificationData');

export const notificationSchema = Joi.object({
  data: notificationDataSchema,
  action: notificationActionSchema,
  recipients: uuidArraySchema,
}).label('Notification');

export const fullNotificationSchema = Joi.object({
  id: uuidSchema,
  userId: uuidSchema,
  queueName: queueNameSchema,
  notification: notificationSchema,
  seen: booleanSchema,
  createdAt: isoDateSchema,
}).label('FullNotification');

export const fullNotificationsArraySchema = Joi.array()
  .items(fullNotificationSchema)
  .label('FullNotificationsArray');

export const getNotificationsResponseSchema = Joi.object({
  count: countSchema,
  unreadCount: countSchema,
  notifications: fullNotificationsArraySchema,
}).label('GetNotificationsResponseSchema');
