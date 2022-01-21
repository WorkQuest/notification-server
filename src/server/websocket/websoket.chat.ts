import { Credentials } from '../types';

export const enum ChatNotificationActions {
  /** Group chat */
  groupChatCreate = 'groupChatCreate',
  groupChatAddUser = 'groupChatAddUser',
  groupChatDeleteUser = 'groupChatDeleteUser',
  groupChatLeaveUser = 'groupChatLeaveUser',
  /** */
  messageReadByRecipient = 'messageReadByRecipient',
  newMessage = 'newMessage',
}

export type ChatNotificationPayload = {
  data: any; // TODO
  recipients: string[];
  action: ChatNotificationActions;
};

const chatSubscriptionFilter = async function (
  path: string,
  notificationPayload: ChatNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  return options.credentials.auth
    ? notificationPayload.recipients.includes(options.credentials.id)
    : false;
};

export const chatSubscriptionOption = {
  path: '/notifications/chat',
  option: { filter: chatSubscriptionFilter },
};

export async function publishChatNotifications(
  server,
  notificationPayload: ChatNotificationPayload,
) {
  return server.publish(chatSubscriptionOption.path, notificationPayload);
}
