import { checkSuccessQueue } from '../utils/queues';
import { publishDaoNotifications } from '../websocket/websocket.dao';

export async function daoNotifications(context, message): Promise<void> {
  await publishDaoNotifications(context);
  await checkSuccessQueue(message, true);
}
