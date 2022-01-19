import { publishInstance } from '../index';
import { checkSuccessQuery } from '../utils/queues';

export async function proposalNotifications(context, message) {
  await publishInstance(context, message);
  await checkSuccessQuery(message, true);
}
