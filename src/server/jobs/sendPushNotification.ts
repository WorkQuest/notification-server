import { PushToken } from '../database/models/PushToken';
import * as i18next from 'i18next';
import { addJob } from '../utils/scheduler';
import * as admin from 'firebase-admin';
import config from '../config/config';
import * as path from 'path';

const intervalPlural = require('i18next-intervalplural-postprocessor');

i18next.use(intervalPlural).init({
  resources: {
    en: require(__dirname + '/../../../locale/en.json'),
  },
  lng: 'en',
});

admin.initializeApp({
  credential: admin.credential.cert(
    require(path.join(__dirname, '..', '..', '..', config.push.apiFile)),
  ),
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
  const actionTitle = 'title.' + payload.action.charAt(0).toLowerCase() + payload.action.slice(1);
  const actionDescription = 'description.' + payload.action.charAt(0).toLowerCase() + payload.action.slice(1);

  const title: string = i18next.t(actionTitle, { ...payload.data, postProcess: 'interval' });
  const description: string = i18next.t(actionDescription, { ...payload.data, postProcess: 'interval' });

  const tokenList = await PushToken.findAll({ where: { userId: payload.recipients } });
  const tokens = tokenList.map((tokenRecord) => tokenRecord.token);

  if (description === actionDescription) {
    return;
  }

  // TODO Customize push and add push title

  if (tokens.length) {
    try {
      await admin.messaging().sendToDevice(tokens, {
        notification: {
          clickAction: 'FLUTTER_NOTIFICATION_CLICK',
          body: description,
          sound: 'default',
        },
        data: {
          action: payload.action,
          ...(payload.data.id && { id: payload.data.id }),
          ...(!payload.data.id && { data: JSON.stringify(payload.data) })
        }
      });
    } catch (err) {
      console.log(err);

      throw Error('FCM sending error');
    }
  }
}
