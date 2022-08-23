import appInstances from "../config/appInstances";

export enum LoanCollateralNotificationActions {
  Produced = 'Produced',
}

export type LoanCollateralNotificationPayload = {
  data: any;
  recipients: string[];
  action: LoanCollateralNotificationActions;
}

export const loanCollateralSubscriptionOption = {
  path: '/notifications/loan-collateral/{address}',
  option: { filter: () => { return true } },
};

export function publishLoanCollateralNotifications(notificationPayload: LoanCollateralNotificationPayload) {
  return appInstances.server.publish(loanCollateralSubscriptionOption.path, notificationPayload);
}
