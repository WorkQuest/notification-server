import * as handlers from '../api/notifications';
import {
  paginationLimitSchema,
  paginationOffsetSchema,
  uuidArraySchema,
  uuidSchema,
} from '../database/schemes/common';
import { emptyOkSchema, outputOkSchema } from '../utils';
import * as Joi from 'joi';
import {
  getNotificationsResponseSchema,
  notificationsExcludeArray,
} from '../database/schemes/notifications';

export default [
  {
    method: 'GET',
    path: '/notifications',
    handler: handlers.getNotifications,
    options: {
      auth: 'jwt-access',
      id: 'v1.notifications.getNotifications',
      tags: ['api', 'notifications'],
      description: 'Get notification for account',
      notes: `
Available notifications queues:
quest - notifications from quest backend and contract;
proposal - notifications from WorkQuest DAO Proposals;
dao - notifications from WorkQuest DAO Platform.
      `,
      validate: {
        query: Joi.object({
          limit: paginationLimitSchema,
          offset: paginationOffsetSchema,
          exclude: notificationsExcludeArray.default([]),
        }).label('GetNotificationQuery'),
      },
      response: {
        schema: outputOkSchema(getNotificationsResponseSchema).label('GetNotificationsResponse'),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/notifications/delete/{notificationId}',
    handler: handlers.deleteNotification,
    options: {
      auth: 'jwt-access',
      id: 'v1.notifications.deleteNotification',
      tags: ['api', 'notifications'],
      description: 'Delete notification',
      validate: {
        params: Joi.object({
          notificationId: uuidSchema,
        }).label('DeleteNotificationPayload'),
      },
      response: {
        schema: emptyOkSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/notifications/mark-read',
    handler: handlers.markRead,
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
      response: {
        schema: emptyOkSchema,
      },
    },
  },
];
