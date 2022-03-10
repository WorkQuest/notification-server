import { checkSuccessQueue } from '../utils/queues';
import { publishReferralNotifications } from '../websocket/websocket.referral';

export async function referralNotifications(context, message): Promise<void> {
  await publishReferralNotifications(context.recipients[0], context);
  await checkSuccessQueue(message, false);
}
