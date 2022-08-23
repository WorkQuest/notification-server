import appInstances from "../config/appInstances";

enum OraclePricesNotificationActions {
  DeterminationPriceUpdated = 'DeterminationPriceUpdated',
}

export type OraclePricesNotificationPayload = {
  data: any;
  recipients: string[];
  action: OraclePricesNotificationActions;
}

export const oraclePricesSubscriptionOption = {
  path: '/notifications/oracle-prices',
  option: { filter: () => true },
};

export function publishOraclePricesNotifications(notificationPayload: OraclePricesNotificationPayload) {
  return appInstances.server.publish(oraclePricesSubscriptionOption.path, notificationPayload);
}
