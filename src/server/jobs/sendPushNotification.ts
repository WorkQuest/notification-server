import { PushToken } from '../database/models/PushToken';
import { addJob } from '../utils/scheduler';
import * as admin from 'firebase-admin';
import config from '../config/config';
import * as path from 'path';

admin.initializeApp({
  credential: require(path.join(__dirname, '..', '..', '..', config.push.apiFile)),
  databaseURL: config.push.database,
});

export interface PushNotificationPayload {
  recipients: string[];
  action: string;
  data: any;
}

export async function sendPushNotification(payload: PushNotificationPayload) {
  await addJob('sendPushNotification', payload);
}

export default async function (payload: PushNotificationPayload) {
  const tokenList = await PushToken.findAll({ where: { userId: payload.recipients } });
  const tokens = tokenList.map((tokenRecord) => tokenRecord.token);

  if (tokens.length) {
    try {
      await admin.messaging().sendToDevice(tokens, payload.data);
    } catch (err) {
      console.log(err);

      throw Error('FCM sending error');
    }
  }
}
