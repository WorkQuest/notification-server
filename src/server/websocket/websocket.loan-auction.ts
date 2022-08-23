import appInstances from "../config/appInstances";

enum LoanAuctionNotificationActions {
  Bought = 'Bought',
  Started = 'Started',
  Canceled = 'Canceled',
  Liquidated = 'Liquidated',
}

type LoanAuctionNotificationPayload = {
  data: any;
  recipients: string[];
  action: LoanAuctionNotificationActions;
}

export const LoanAuctionSubscriptionOption = {
  path: '/notifications/loan-auction',
  option: { filter: () => true },
};

export function publishLoanAuctionNotifications(notificationPayload: LoanAuctionNotificationPayload) {
  return appInstances.server.publish(LoanAuctionSubscriptionOption.path, notificationPayload);
}
