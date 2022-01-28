import { checkSuccessQueue } from '../utils/queues';
import { publishBridgeNotifications } from '../websocket/websoket.bridge';

export async function bridgeNotifications(context, message): Promise<void> {
  await publishBridgeNotifications(context.recipient, context);
  await checkSuccessQueue(message, false);
}
