import { publishInstance } from '../index';
import { WebsocketPaths } from '../websocket';
import { checkSuccessQuery } from '../utils/queues';

export async function chatNotifications(context, message): Promise<void> {
  await publishInstance(WebsocketPaths.Chat, context);
  await checkSuccessQuery(message, false);
}
