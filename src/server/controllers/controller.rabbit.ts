import config from '../config/config';
import amqp from 'amqplib/callback_api';
import { sleep } from "../utils";
import { QueueController } from './controller.queues';
import { Logger } from "../config/pino";

export class RabbitController {
  private channel;

  private initQueues() {
    const queueController = new QueueController(this.channel);

    queueController.initQueues();
  }

  public initMessageBroker() {
    amqp.connect(config.rabbit.url, (connectErr, conn) => {
      if (connectErr) {
        Logger.error(connectErr, 'Can`t connect to RabbitMQ');
      }

      conn.on('error', (connectionErr) => {
        Logger.error(connectionErr.message, 'RabbitMQ Error');
      });

      conn.on('close', async () => {
        Logger.error(null, 'RabbitMQ connection closed, reconnecting...');
        await sleep(5000);
        this.initMessageBroker();
      });

      conn.createChannel((channelErr, channel) => {
        if (channelErr) {
          Logger.error(channelErr.message, 'Can`t create RabbitMQ Channel');
        }

        this.channel = channel;
        this.initQueues();
      });

      Logger.info('RabbitMQ successfully connected');
    });
  }
}

export const rabbitController = new RabbitController();
