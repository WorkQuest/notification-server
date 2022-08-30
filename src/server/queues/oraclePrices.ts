import { publishOraclePricesNotifications } from '../websocket/websocket.oraclePrices';
import { checkSuccessQueue } from '../utils/queues';

export async function oraclePricesNotifications(context, message): Promise<void> {
  await publishOraclePricesNotifications(context);
  await checkSuccessQueue(message, false);
}
