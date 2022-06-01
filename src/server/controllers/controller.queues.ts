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
      this.initQueue(ConsumerQueues.DAO);
      this.initQueue(ConsumerQueues.Chat);
      this.initQueue(ConsumerQueues.Quest);
      this.initQueue(ConsumerQueues.Report);
      this.initQueue(ConsumerQueues.Bridge);
      this.initQueue(ConsumerQueues.Proposal);
      this.initQueue(ConsumerQueues.Referral);
      this.initQueue(ConsumerQueues.PensionFund);
      this.initQueue(ConsumerQueues.DailyLiquidity);
    } catch (err) {
      console.error(err);
    }
  }
}
