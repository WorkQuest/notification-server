import { checkSuccessQueue } from "../utils/queues";
import { publishLoanAuctionNotifications } from "../websocket/websocket.loan-auction";

export async function loanAuctionNotifications(context, message): Promise<void> {
  await publishLoanAuctionNotifications(context);
  await checkSuccessQueue(message, false);
}
