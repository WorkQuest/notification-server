import { checkSuccessQueue } from '../utils/queues';
import { publishQuestNotifications } from '../websocket/websocket.quest';
import { sendPushNotification } from '../jobs/sendPushNotification';

export async function questNotifications(context, message): Promise<void> {
  await sendPushNotification(context);
  await publishQuestNotifications(context);
  await checkSuccessQueue(message, true);
}
