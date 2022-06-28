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

export const proposalSubscriptionFilter = async function(
  path: string,
  notificationPayload: ProposalNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  return true;
};

export const proposalSubscriptionOption = {
  path: '/notifications/proposal/{address}',
  pathWithoutAddress: '/notifications/proposal',
  option: { filter: proposalSubscriptionFilter },
};

export async function publishProposalNotifications(
  recipientAddress: string,
  notificationPayload: ProposalNotificationPayload,
) {
  return appInstances.server.publish(
    proposalSubscriptionOption.pathWithoutAddress + `/${recipientAddress}`,
    notificationPayload
  );
}

