import { checkSuccessQueue } from '../utils/queues';
import { publishBridgeNotifications } from '../websocket/websocket.bridge';

export async function bridgeNotifications(context, message): Promise<void> {
  await publishBridgeNotifications(context.recipients[0], context);
  await checkSuccessQueue(message, false);
}
