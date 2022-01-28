import { Credentials } from '../types';
import appInstances from '../config/appInstances';

export const enum QuestNotificationActions {
  /** Quest flow */
  questStarted = 'questStarted',
  workerRejectedQuest = 'workerRejectedQuest',
  workerAcceptedQuest = 'workerAcceptedQuest',
  workerCompletedQuest = 'workerCompletedQuest',
  employerAcceptedCompletedQuest = 'employerAcceptedCompletedQuest',
  employerRejectedCompletedQuest = 'employerRejectedCompletedQuest',
  /** Quest Response */
  workerRespondedToQuest = 'workerRespondedToQuest',
  employerInvitedWorkerToQuest = 'employerInvitedWorkerToQuest',
  workerAcceptedInvitationToQuest = 'workerAcceptedInvitationToQuest',
  workerRejectedInvitationToQuest = 'workerRejectedInvitationToQuest',
  employerRejectedWorkersResponse = 'employerRejectedWorkersResponse',
  /** Review */
  userLeftReviewAboutQuest = 'userLeftReviewAboutQuest',
}

export type QuestNotificationPayload = {
  data: any; // TODO
  recipients: string[];
  action: QuestNotificationActions;
};

const questSubscriptionFilter = async function (
  path: string,
  notificationPayload: QuestNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  return options.credentials.auth
    ? notificationPayload.recipients.includes(options.credentials.id)
    : false;
};

export const questSubscriptionOption = {
  path: '/notifications/quest',
  option: { filter: questSubscriptionFilter },
};

export async function publishQuestNotifications(notificationPayload: QuestNotificationPayload) {
  return appInstances.server.publish(questSubscriptionOption.path, notificationPayload);
}
