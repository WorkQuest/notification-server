import { Credentials } from '../types';

export enum BridgeNotificationActions {}

export type BridgeNotificationPayload = {
  data: any; // TODO
  // recipients: string[];
  action: BridgeNotificationActions;
};

const dailyLiquiditySubscriptionFilter = async function (
  path: string,
  notificationPayload: BridgeNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  return true; // TODO Credentials by address
};

export const bridgeSubscriptionOption = {
  path: '/notifications/bridge/{address}',
  option: { filter: dailyLiquiditySubscriptionFilter },
};

export async function publishBridgeNotifications(
  server,
  notificationPayload: BridgeNotificationPayload,
) {
  return server.publish(bridgeSubscriptionOption.path, notificationPayload);
}
