import { LocalQueue } from '../database/models/LocalQueue';
import { Notification } from '../database/models/Notification';

export async function checkSuccessQueue(message, isNeededNotification: boolean): Promise<void> {
  const errored = await LocalQueue.findOne({
    where: { 'message.rabbitMessageId': message.rabbitMessageId },
  });

  if (isNeededNotification) {
    const data = JSON.parse(message.content);

    const notifications = data.recipients.map((recipientId) => {
      return {
        userId: recipientId,
        notification: data,
      };
    });

    await Notification.bulkCreate(notifications);
  }

  if (errored) {
    await errored.destroy();
  }
}
