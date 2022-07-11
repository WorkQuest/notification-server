import { ConsumerQueues } from '../utils/consumers';
import { messageController } from './controller.message';

export class QueueController {
  private channel;

  constructor(channel) {
    this.channel = channel;
  }

  private initQueue(queue: string) {
    // Create queue
    this.channel.assertQueue(queue, {
      durable: false,
    });

    // Init queue listener
    this.channel.consume(
      queue,
      async (message) => {
        await messageController.executeMessage(message);
      },
      { noAck: true },
    );
  }

  public initQueues() {
    try {
      Object.values(ConsumerQueues).map(queue => this.initQueue(queue));
    } catch (err) {
      console.error(err);
    }
  }
}
