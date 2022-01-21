import config from '../config/config';
import amqp from 'amqplib/callback_api';
import { sleep } from '../utils';
import { QueueController } from './controller.queues';

export class RabbitController {
  private channel;

  private initQueues() {
    const queueController = new QueueController(this.channel);

    queueController.initQueues();
  }

  public initMessageBroker() {
    amqp.connect(config.rabbit.url, (connectErr, conn) => {
      if (connectErr) {
        console.error(connectErr.message);
      }

      conn.on('error', (connectionErr) => {
        console.error(connectionErr.message);
      });

      conn.on('close', async () => {
        await sleep(5000);
        this.initMessageBroker();
      });

      conn.createChannel((channelErr, channel) => {
        if (channelErr) {
          console.error(channelErr.message);
        }

        this.channel = channel;
        this.initQueues();
      });

      console.log('Message broker connected');
    });
  }
}

export const rabbitController = new RabbitController();
