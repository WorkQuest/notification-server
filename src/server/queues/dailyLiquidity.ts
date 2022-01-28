import { checkSuccessQueue } from '../utils/queues';
import { publishDailyLiquidityNotifications } from '../websocket/websoket.dailyLiquidity';

export async function dailyLiquidityNotifications(context, message) {
  await publishDailyLiquidityNotifications(context);
  await checkSuccessQueue(message, false);
}
