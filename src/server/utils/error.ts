import { LocalQueue } from '../database/models/LocalQueue';
import moment from 'moment';

export enum Errors {
  NotFound = 404000,
  TokenExpired = 401001,
  TokenInvalid = 401002,
}

export async function onErroredQueue(message): Promise<void> {
  const [messageRow, isCreated] = await LocalQueue.findOrCreate({
    where: { 'message.rabbitMessageId': message.rabbitMessageId },
    defaults: {
      message,
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
