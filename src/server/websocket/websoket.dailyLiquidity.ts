import { Credentials } from '../types';

export enum DailyLiquidityNotificationActions {}

export type DailyLiquidityNotificationPayload = {
  data: any; // TODO
  // recipients: string[];
  action: DailyLiquidityNotificationActions;
};

const dailyLiquiditySubscriptionFilter = async function (
  path: string,
  notificationPayload: DailyLiquidityNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  return true;
};

export const dailyLiquiditySubscriptionOption = {
  path: '/notifications/dailyLiquidity',
  option: { filter: dailyLiquiditySubscriptionFilter },
};

export async function publishDailyLiquidityNotifications(
  server,
  notificationPayload: DailyLiquidityNotificationPayload,
) {
  return server.publish(dailyLiquiditySubscriptionOption.path, notificationPayload);
}
