import appInstances from "../config/appInstances";

enum LoanAuctionNotificationActions {
  Bought = 'Bought',
  Started = 'Started',
  Canceled = 'Canceled',
  Liquidated = 'Liquidated',
}

export type LoanAuctionNotificationPayload = {
  data: any;
  recipients: string[];
  action: LoanAuctionNotificationActions;
}

export const loanAuctionSubscriptionOption = {
  path: '/notifications/loan-auction',
  option: { filter: () => true },
};

export function publishLoanAuctionNotifications(notificationPayload: LoanAuctionNotificationPayload) {
  return appInstances.server.publish(loanAuctionSubscriptionOption.path, notificationPayload);
}
