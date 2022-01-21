import { publishInstance } from '../index';
import { WebsocketPaths } from '../websocket';
import { checkSuccessQueue } from '../utils/queues';

export async function dailyLiquidityNotifications(context, message) {
  await publishInstance(WebsocketPaths.DailyLiquidity, context);
  await checkSuccessQueue(message, false);
}
