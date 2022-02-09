import { Credentials } from '../types';
import appInstances from '../config/appInstances';

export enum ProposalNotificationActions {
  ProposalCreated = 'ProposalCreated',
  VoteCast = 'VoteCast',
  ProposalExecuted = 'ProposalExecuted',
}

export type ProposalNotificationPayload = {
  data: any; // TODO
  recipients: string[];
  action: ProposalNotificationActions;
};

export const proposalSubscriptionFilter = async function (
  path: string,
  notificationPayload: ProposalNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  if (!options.credentials.auth) {
    return false;
  }

  switch (notificationPayload.action) {
    case ProposalNotificationActions.ProposalCreated:
      return notificationPayload.recipients.includes(options.credentials.id);

    case ProposalNotificationActions.VoteCast:
      return notificationPayload.recipients.includes(options.credentials.id);

    default: {
      return false;
    }
  }
};

export const proposalSubscriptionOption = {
  path: '/notifications/proposal',
  option: { filter: proposalSubscriptionFilter },
};

export async function publishProposalNotifications(
  notificationPayload: ProposalNotificationPayload,
) {
  return appInstances.server.publish(proposalSubscriptionOption.path, notificationPayload);
}
