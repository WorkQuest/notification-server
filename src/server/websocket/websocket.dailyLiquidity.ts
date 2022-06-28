import { Credentials } from '../types';
import appInstances from '../config/appInstances';

export enum DailyLiquidityNotificationActions {}

export type DailyLiquidityNotificationPayload = {
  data: any;
  recipients: string[];
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
  notificationPayload: DailyLiquidityNotificationPayload,
) {
  return appInstances.server.publish(dailyLiquiditySubscriptionOption.path, notificationPayload);
}
