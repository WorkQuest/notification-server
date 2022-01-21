import { Credentials } from '../types';

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
      return notificationPayload.data.authorId === options.credentials.id;

    case ProposalNotificationActions.VoteCast:
      return notificationPayload.data.authorId === options.credentials.id;

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
  server,
  notificationPayload: ProposalNotificationPayload,
) {
  return server.publish(proposalSubscriptionOption.path, notificationPayload);
}
