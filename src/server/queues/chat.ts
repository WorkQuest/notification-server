import { publishInstance } from '../index';
import { checkSuccessQueue } from '../utils/queues';
import { chatSubscriptionOption } from '../websocket/websoket.chat';

export async function chatNotifications(context, message): Promise<void> {
  await publishInstance(chatSubscriptionOption.path, context);
  await checkSuccessQueue(message, false);
}
