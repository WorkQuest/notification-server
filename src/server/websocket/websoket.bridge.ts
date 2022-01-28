import { Credentials } from '../types';
import appInstances from '../config/appInstances';

export enum BridgeNotificationActions {}

export type BridgeNotificationPayload = {
  data: any; // TODO
  // recipients: string[];
  action: BridgeNotificationActions;
};

const bridgeSubscriptionFilter = async function (
  path: string,
  notificationPayload: BridgeNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  console.log(notificationPayload);
  return true;
};

export const bridgeSubscriptionOption = {
  path: '/notifications/bridge/{address}',
  pathWithoutAddress: '/notifications/bridge',
  option: { filter: bridgeSubscriptionFilter },
};

export async function publishBridgeNotifications(
  recipientAddress: string,
  notificationPayload: BridgeNotificationPayload,
) {
  return appInstances.server.publish(
    bridgeSubscriptionOption.pathWithoutAddress + `/${recipientAddress}`,
    notificationPayload,
  );
}
