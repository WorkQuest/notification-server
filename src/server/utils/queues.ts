import { Queue } from '../queues';
import { ConsumerQueues } from './consumers';
import { getUUID } from './index';
import { onErroredQueue } from './error';
import { LocalQueue } from '../database/models/LocalQueue';

export async function messageHandler(message): Promise<void> {
  // Get queue name
  const queueName = message.fields.routingKey;

  // Get object with queue command
  const queue = Queue[queueName.toLowerCase()];
  if (!queue) {
    return;
  }

  message.messageId ??= getUUID();
  message.content = message.content.toString();

  try {
    // Executing a command for this queue
    await queue.execute(JSON.parse(message.content), message);
  } catch (err) {
    await onErroredQueue(message);
  }
}

function initQueue(channel, queue) {
  // Create queue
  channel.assertQueue(queue, {
    durable: false,
  });

  // Init queue listener
  channel.consume(
    queue,
    (message) => {
      messageHandler(message);
    },
    { noAck: true },
  );
}

export function initQueues(channel) {
  try {
    initQueue(channel, ConsumerQueues.Bridge);
    initQueue(channel, ConsumerQueues.Proposal);
    initQueue(channel, ConsumerQueues.DailyLiquidity);
  } catch (err) {
    console.error(err);
  }
}

export async function checkSuccessQuery(message): Promise<void> {
  const errored = await LocalQueue.findOne({
    where: { 'message.messageId': message.messageId },
  });

  if (errored) {
    await errored.destroy();
  }
}
