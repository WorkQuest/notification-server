import { checkSuccessQueue } from '../utils/queues';
import { publishQuestNotifications } from '../websocket/websocket.quest';

export async function questNotifications(context, message): Promise<void> {
  await publishQuestNotifications(context);
  await checkSuccessQueue(message, true);
}
