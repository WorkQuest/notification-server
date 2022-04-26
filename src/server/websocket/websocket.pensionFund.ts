import { Credentials } from '../types';
import appInstances from '../config/appInstances';

export enum PensionFundNotificationActions {
  Withdrew = 'Withdrew',
  Received = 'Received',
  WalletUpdated = 'WalletUpdated',
}

export type PensionFundNotificationPayload = {
  data: any; // TODO
  recipients: string[];
  action: PensionFundNotificationActions;
};

export const pensionFundSubscriptionFilter = async function (): Promise<boolean> {
  return true;
};

export const pensionFundSubscriptionOption = {
  path: '/notifications/pensionFund/{address}',
  pathWithoutAddress: '/notifications/pensionFund',
  option: { filter: pensionFundSubscriptionFilter },
};

export async function publishPensionFundNotifications(
  recipientAddress: string,
  notificationPayload: PensionFundNotificationPayload,
) {
  return appInstances.server.publish(
    pensionFundSubscriptionOption.pathWithoutAddress + `/${recipientAddress}`,
    notificationPayload,
  );
}
