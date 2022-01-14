import { sleep } from './index';
import config from '../config/config';
import amqp from 'amqplib/callback_api';
import { initQueues } from '../utils/queues';

export function initRabbitMQ() {
  amqp.connect(config.rabbit.url, (err, conn) => {
    if (err) {
      console.error(err.message);
    }

    conn.on('error', (err) => {
      console.error(err.message);
    });

    conn.on('close', async () => {
      await sleep(5000);
      initRabbitMQ();
    });

    conn.createChannel((err, channel) => {
      if (err) {
        console.error(err.message);
      }

      initQueues(channel);
    });

    console.log('Connected');

    return conn;
  });
}
