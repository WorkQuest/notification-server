import Joi from 'joi';
import { uuidSchema } from './common';

export const pushTokenSchema = Joi.string().example('token...');

export const registerPushTokenResponse = Joi.object({
  tokenId: uuidSchema,
}).label('RegisterPushTokenResponseSchema');
