import { pushTokenSchema, registerPushTokenResponse } from '../database/schemes/push';
import { emptyOkSchema, outputOkSchema } from '../utils';
import * as handlers from '../api/push';
import * as Joi from 'joi';

export default [
  {
    method: 'POST',
    path: '/push/register',
    handler: handlers.registerPushToken,
    options: {
      id: 'v1.push.registerToken',
      auth: 'jwt-access',
      tags: ['api', 'push'],
      description: 'Register push token to receive push notifications',
      validate: {
        payload: Joi.object({
          token: pushTokenSchema.required(),
        }).label('RegisterPushTokenPayload'),
      },
      response: {
        schema: outputOkSchema(registerPushTokenResponse).label('RegisterPushTokenResponse'),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/push/delete',
    handler: handlers.deletePushToken,
    options: {
      id: 'v1.push.deleteToken',
      auth: 'jwt-access',
      tags: ['api', 'push'],
      description: 'Delete push token',
      validate: {
        payload: Joi.object({
          token: pushTokenSchema.required(),
        }).label('DeletePushTokenPayload'),
      },
      response: {
        schema: emptyOkSchema,
      },
    },
  },
];
