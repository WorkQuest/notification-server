import { publishInstance } from '../index';
import { WebsocketPaths } from '../websocket';
import { checkSuccessQuery } from '../utils/queues';

export async function bridgeNotifications(context, message): Promise<void> {
  await publishInstance(`${WebsocketPaths.Bridge}/${context.walletId}`, context);
  await checkSuccessQuery(message, false);
}
