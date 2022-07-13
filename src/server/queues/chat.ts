import { checkSuccessQueue } from '../utils/queues';
import { publishChatNotifications } from '../websocket/websocket.chat';
import { sendPushNotification } from '../jobs/sendPushNotification';

export async function chatNotifications(context, message): Promise<void> {
  await sendPushNotification(context);
  await publishChatNotifications(context);
  await checkSuccessQueue(message, false);
}
