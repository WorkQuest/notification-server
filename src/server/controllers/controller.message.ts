import { getUUID } from '../utils';
import { LocalQueue } from '../database/models/LocalQueue';
import moment from 'moment';
import { Queue } from '../queues';

export class MessageController {
  private parseMessage(message: any) {
    // Get queue name
    const queueName = message.fields.routingKey;

    // Get object with queue command
    const queue = Queue[queueName.toLowerCase()];
    if (!queue) {
      return;
    }

    message.rabbitMessageId ??= getUUID();
    message.content = message.content.toString();

    return { queue, message };
  }

  private async processMessage(message, err) {
    const [messageRow, isCreated] = await LocalQueue.findOrCreate({
      where: { 'message.rabbitMessageId': message.rabbitMessageId },
      defaults: {
        message,
        lastError: err,
        attempts: 1,
        runAt: moment().add(5, 'seconds').toDate(),
      },
    });

    if (!isCreated) {
      if (messageRow.attempts >= 25) {
        await messageRow.destroy();

        return;
      }

      await messageRow.addAttempt();
    }
  }

  public async executeMessage(rawMessage) {
    const { message, queue } = this.parseMessage(rawMessage);

    try {
      // Executing a command for this queue
      await queue.execute(JSON.parse(message.content), message);
    } catch (err) {
      await this.processMessage(message, err.message);
    }
  }
}

export const messageController = new MessageController();
