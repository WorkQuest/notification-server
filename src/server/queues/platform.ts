import { publishInstance } from '../index';
import { checkSuccessQueue } from '../utils/queues';
import { WebsocketPaths } from '../websocket';

export async function platformNotification(context, message) {
  await publishInstance(WebsocketPaths.Platform, message);
  await checkSuccessQueue(message, true);
}
