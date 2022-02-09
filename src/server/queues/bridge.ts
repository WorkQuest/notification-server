import { checkSuccessQueue } from '../utils/queues';
import { publishBridgeNotifications } from '../websocket/websocket.bridge';

export async function bridgeNotifications(context, message): Promise<void> {
  await publishBridgeNotifications(context.data.recipient, context);
  await checkSuccessQueue(message, false);
}
