import { publishInstance } from '../index';
import { checkSuccessQueue } from '../utils/queues';
import { WebsocketPaths } from '../websocket';

export async function proposalNotifications(context, message) {
  await publishInstance(WebsocketPaths.Proposal, message);
  await checkSuccessQueue(message, true);
}
