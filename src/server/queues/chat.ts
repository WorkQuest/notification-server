import { publishInstance } from '../index';
import { WebsocketPaths } from '../websocket';
import { checkSuccessQueue } from '../utils/queues';

export async function chatNotifications(context, message): Promise<void> {
  await publishInstance(WebsocketPaths.Chat, context);
  await checkSuccessQueue(message, false);
}
