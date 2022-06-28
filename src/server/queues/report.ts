import { checkSuccessQueue } from '../utils/queues';
import { publishReportNotifications } from '../websocket/websocket.report';

export async function referralNotifications(context, message): Promise<void> {
  await publishReportNotifications(context);
  await checkSuccessQueue(message, true);
}
