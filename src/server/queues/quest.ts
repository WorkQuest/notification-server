import { publishInstance } from '../index';
import { checkSuccessQueue } from '../utils/queues';
import { questSubscriptionOption } from '../websocket/websoket.quest';

export async function questNotifications(context, message): Promise<void> {
  await publishInstance(questSubscriptionOption.path, context);
  await checkSuccessQueue(message, true);
}
