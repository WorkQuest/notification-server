import { publishLoanCollateralNotifications } from '../websocket/websocket.loanCollateral';
import { checkSuccessQueue } from '../utils/queues';

export async function loanCollateralNotification(context, message): Promise<void> {
  await publishLoanCollateralNotifications(context.recipients[0], context);
  await checkSuccessQueue(message, false);
}
