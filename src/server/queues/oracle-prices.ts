import { checkSuccessQueue } from "../utils/queues";
import { publishOraclePricesNotifications } from "../websocket/websocket.oracle-prices";

export async function oraclePricesNotifications(context, message): Promise<void> {
  await publishOraclePricesNotifications(context);
  await checkSuccessQueue(message, false);
}
