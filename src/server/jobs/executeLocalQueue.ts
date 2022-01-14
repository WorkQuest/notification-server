import { Helpers } from 'graphile-worker';
import { LocalQueue } from '../database/models/LocalQueue';
import { sleep } from '../utils';
import { messageHandler } from '../utils/queues';
import { Op } from 'sequelize';
import moment from 'moment';

export default async function (_, h: Helpers) {
  const queue = await LocalQueue.findAll({
    where: { runAt: { [Op.lte]: moment().toDate() } },
  });

  if (!queue.length) {
    await sleep(5000);
  } else {
    for (const { message } of queue) {
      messageHandler(message);
    }
  }

  await h.addJob('executeLocalQueue', {}, { jobKey: 'local_query' });
}
