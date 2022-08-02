import { Credentials } from '../types';
import appInstances from '../config/appInstances';

export enum ReferralNotificationActions {
  RegisteredAffiliate = 'RegisteredAffiliat',
  RewardClaimed = 'RewardClaimed',
  PaidReferral = 'PaidReferral',
}

export type ReferralNotificationPayload = {
  data: any; // TODO
  recipients: string[];
  action: ReferralNotificationActions;
};

const referralSubscriptionFilter = async function (
  path: string,
  notificationPayload: ReferralNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  return options.credentials.auth
    ? notificationPayload.recipients.includes(options.credentials.id)
    : false;
};

export const referralSubscriptionOption = {
  path: '/notifications/referral',
  option: { filter: referralSubscriptionFilter },
};

export async function publishReferralNotifications(notificationPayload: ReferralNotificationPayload) {
  return appInstances.server.publish(referralSubscriptionOption.path, notificationPayload,);
}
