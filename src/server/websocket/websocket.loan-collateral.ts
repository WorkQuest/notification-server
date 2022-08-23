import appInstances from "../config/appInstances";

export enum LoanCollateralNotificationActions {
  Moved = 'Moved',
  Removed = 'Removed',
  Produced = 'Produced',
  UpdatedPrices = 'UpdatedPrices',
}

export type LoanCollateralNotificationPayload = {
  data: any;
  recipients: string[];
  action: LoanCollateralNotificationActions;
}

export const loanCollateralSubscriptionOption = {
  pathWithoutAddress: '/notifications/loan-collateral',
  path: '/notifications/loan-collateral/{address}',
  option: { filter: () => { return true } },
};

export function publishLoanCollateralNotifications(
  recipientAddress: string,
  notificationPayload: LoanCollateralNotificationPayload
) {
  return appInstances.server.publish(
    loanCollateralSubscriptionOption.pathWithoutAddress + `/${recipientAddress}`,
    notificationPayload,
  );
}
