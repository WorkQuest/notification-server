import { checkSuccessQueue } from "../utils/queues";
import { publishLoanCollateralNotifications } from "../websocket/websocket.loan-collateral";

export async function LoanCollateralNotification(context, message): Promise<void> {
  await publishLoanCollateralNotifications(context.recipients[0], context);
  await checkSuccessQueue(message, false);
}
