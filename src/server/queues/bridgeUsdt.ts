import { publishBridgeUsdtNotifications } from "../websocket/websocket.bridgeUsdt";
import { checkSuccessQueue } from "../utils/queues";

export async function bridgeUsdtNotification(context, message): Promise<void> {
  await publishBridgeUsdtNotifications(context.recipients[0], context);
  await checkSuccessQueue(message, false);
}