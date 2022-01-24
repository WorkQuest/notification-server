import { publishInstance } from '../index';
import { checkSuccessQueue } from '../utils/queues';
import { bridgeSubscriptionOption } from '../websocket/websoket.bridge';

export async function bridgeNotifications(context, message): Promise<void> {
  await publishInstance(
    bridgeSubscriptionOption.pathWithoutAddress + `/${context.recipient}`,
    context,
  );
  await checkSuccessQueue(message, false);
}
