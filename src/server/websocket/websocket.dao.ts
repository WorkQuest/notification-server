import { Credentials } from '../types';
import appInstances from '../config/appInstances';

export const enum DaoNotificationActions {
  /** Discussions */
  newDiscussionLike = 'newDiscussionLike',
  newCommentInDiscussion = 'newCommentInDiscussion',
  commentLiked = 'commentLiked',
  replyToComment = 'replyToComment',
  /** Proposal */
}

export type DaoNotificationPayload = {
  data: any; // TODO
  recipients: string[];
  action: DaoNotificationActions;
};

export const daoSubscriptionFilter = async function (
  path: string,
  notificationPayload: DaoNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  return options.credentials.auth
    ? notificationPayload.recipients.includes(options.credentials.id)
    : false;
};

export const daoSubscriptionOption = {
  path: '/notifications/dao',
  option: { filter: daoSubscriptionFilter },
};

export async function publishDaoNotifications(notificationPayload: DaoNotificationPayload) {
  return appInstances.server.publish(daoSubscriptionOption.path, notificationPayload);
}
