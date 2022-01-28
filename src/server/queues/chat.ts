import { checkSuccessQueue } from '../utils/queues';
import { publishChatNotifications } from '../websocket/websoket.chat';

export async function chatNotifications(context, message): Promise<void> {
  await publishChatNotifications(context);
  await checkSuccessQueue(message, false);
}
