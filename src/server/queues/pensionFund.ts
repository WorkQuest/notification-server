import { checkSuccessQueue } from '../utils/queues';
import { publishPensionFundNotifications } from '../websocket/websocket.pensionFund';

export async function pensionFundNotifications(context, message): Promise<void> {
  await publishPensionFundNotifications(context.recipients[0], context);
  await checkSuccessQueue(message, false);
}
