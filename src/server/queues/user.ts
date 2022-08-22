import { checkSuccessQueue } from "../utils/queues";

export const enum UserNotificationActions {
  // From platform
  UserRegistered = 'UserRegistered',

  // From notification service
  InviteFriendsReward = 'InviteFriendsReward',
  WorkQuestWikiPage = 'WorkQuestWikiPage',
  EnableSumsubKYC = 'EnableSumsubKYC',
  EnableDoubleAuthentication = 'EnableDoubleAuthentication',
  FillProfileDataOnSettings = 'FillProfileDataOnSettings'
}

function changeMessageContentAction(context, message, action: string) {
  return { ...message, content: JSON.stringify({ ...context, action }) };
}

export async function userNotifications(context, message): Promise<void> {
  if (context.action === UserNotificationActions.UserRegistered) {
    await Promise.all([
      checkSuccessQueue(
        changeMessageContentAction(context, message, UserNotificationActions.FillProfileDataOnSettings),
        true
      ),
      checkSuccessQueue(
        changeMessageContentAction(context, message, UserNotificationActions.EnableDoubleAuthentication),
        true
      ),
      checkSuccessQueue(
        changeMessageContentAction(context, message, UserNotificationActions.EnableSumsubKYC),
        true
      ),
      checkSuccessQueue(
        changeMessageContentAction(context, message, UserNotificationActions.WorkQuestWikiPage),
        true
      ),
      checkSuccessQueue(
        changeMessageContentAction(context, message, UserNotificationActions.InviteFriendsReward),
        true
      ),
    ]);

    return;
  }

  await checkSuccessQueue(message, true);
}