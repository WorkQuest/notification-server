import { publishInstance } from '../index';
import { WebsocketPaths } from '../websocket';
import { checkSuccessQueue } from '../utils/queues';

export async function bridgeNotifications(context, message): Promise<void> {
  await publishInstance(`${WebsocketPaths.Bridge}/${context.walletId}`, context);
  await checkSuccessQueue(message, false);
}
