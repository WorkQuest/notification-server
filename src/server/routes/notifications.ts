import { deleteNotification, getNotifications, markRead } from '../api/notifications';
import { paginationSchema, uuidArraySchema, uuidSchema } from '../database/schemes/common';
import Joi from 'joi';

export default [
  {
    method: 'GET',
    path: '/notifications',
    handler: getNotifications,
    options: {
      auth: 'jwt-access',
      id: 'v1.notifications.getNotifications',
      tags: ['api', 'notifications'],
      description: 'Get notification for account',
      validate: {
        query: paginationSchema.label('GetNotificationQuery'),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/notifications/delete',
    handler: deleteNotification,
    options: {
      auth: 'jwt-access',
      id: 'v1.notifications.deleteNotification',
      tags: ['api', 'notifications'],
      description: 'Delete notification',
      validate: {
        payload: Joi.object({
          notificationId: uuidSchema,
        }).label('DeleteNotificationPayload'),
      },
    },
  },
  {
    method: 'PUT',
    path: '/notifications/mark-read',
    handler: markRead,
    options: {
      auth: 'jwt-access',
      id: 'v1.notifications.markReadNotifications',
      tags: ['api', 'notifications'],
      description: 'Mark notifications as read',
      validate: {
        payload: Joi.object({
          notificationIds: uuidArraySchema,
        }).label('MarkReadNotificationsPayload'),
      },
    },
  },
];
