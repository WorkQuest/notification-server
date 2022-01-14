import { publishInstance } from '../index';
import { WebsocketPaths } from '../websocket';
import { checkSuccessQuery } from '../utils/queues';

export async function dailyLiquidityNotifications(context, message) {
  await publishInstance(WebsocketPaths.DailyLiquidity, context);
  await checkSuccessQuery(message);
}
