import { LocalQueue } from '../database/models/LocalQueue';
import { Notification } from '../database/models/Notification';

export async function checkSuccessQueue(message, isNeededNotification: boolean): Promise<void> {
  const errored = await LocalQueue.findOne({
    where: { 'message.rabbitMessageId': message.rabbitMessageId },
  });

  if (isNeededNotification) {
    const notification = JSON.parse(message.content);
    const queueName = message.fields.routingKey;

    const notifications = notification.recipients.map((userId) => {
      return { queueName, userId, notification };
    });

    await Notification.bulkCreate(notifications);
  }

  if (errored) {
    await errored.destroy();
  }
}
