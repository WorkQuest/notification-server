import { publishInstance } from '../index';
import { checkSuccessQueue } from '../utils/queues';
import { proposalSubscriptionOption } from '../websocket/websoket.proposal';

export async function proposalNotifications(context, message) {
  await publishInstance(proposalSubscriptionOption.path, context);
  await checkSuccessQueue(message, true);
}
