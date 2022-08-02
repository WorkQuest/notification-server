import { publishReferralNotifications, ReferralNotificationActions } from "../websocket/websocket.referral";
import { checkSuccessQueue } from '../utils/queues';

export async function referralNotifications(context, message): Promise<void> {
  await publishReferralNotifications(context);
  await checkSuccessQueue(
    message,
    context.action === ReferralNotificationActions.PaidReferral
  );
}
