import { deleteNotification, getNotifications } from '../api/notifications';
import { paginationSchema, uuidSchema } from '../database/schemes/common';
import Joi from 'joi';

export default [
  {
    method: 'GET',
    path: '/notifications',
    handler: getNotifications,
    options: {
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
];
