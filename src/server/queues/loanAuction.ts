import { publishLoanAuctionNotifications } from '../websocket/websocket.loanAuction';
import { checkSuccessQueue } from '../utils/queues';

export async function loanAuctionNotifications(context, message): Promise<void> {
  await publishLoanAuctionNotifications(context);
  await checkSuccessQueue(message, false);
}
