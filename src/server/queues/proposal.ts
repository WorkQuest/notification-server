import { checkSuccessQueue } from '../utils/queues';
import { publishProposalNotifications } from '../websocket/websocket.proposal';

export async function proposalNotifications(context, message) {
  await publishProposalNotifications(context);
  await checkSuccessQueue(message, true);
}
