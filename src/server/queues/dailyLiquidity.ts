import { publishInstance } from '../index';
import { checkSuccessQueue } from '../utils/queues';
import { dailyLiquiditySubscriptionOption } from '../websocket/websoket.dailyLiquidity';

export async function dailyLiquidityNotifications(context, message) {
  await publishInstance(dailyLiquiditySubscriptionOption.path, context);
  await checkSuccessQueue(message, false);
}
