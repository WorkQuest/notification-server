import { Credentials } from '../types';
import appInstances from '../config/appInstances';

export enum BridgeUsdtNotificationActions {
  TransactionSuccessful = 'TransactionSuccessful',
  TransactionError = 'TransactionError',
  SwapInitialized = 'SwapInitialized'
}

export type BridgeUsdtNotificationPayload = {
  data: any; // TODO
  recipients: string[];
  action: BridgeUsdtNotificationActions;
};

const bridgeUsdtSubscriptionFilter = async function(
  path: string,
  notificationPayload: BridgeUsdtNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  return true;
};

export const bridgeUsdtSubscriptionOption = {
  path: '/notifications/bridge-usdt/{address}',
  pathWithoutAddress: '/notifications/bridge-usdt',
  option: { filter: bridgeUsdtSubscriptionFilter },
};

export async function publishBridgeUsdtNotifications(
  recipientAddress: string,
  notificationPayload: BridgeUsdtNotificationPayload,
) {
  return appInstances.server.publish(
    bridgeUsdtSubscriptionOption.pathWithoutAddress + `/${recipientAddress}`,
    notificationPayload,
  );
}
