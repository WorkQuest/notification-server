import { Helpers } from 'graphile-worker';
import { LocalQueue } from '../database/models/LocalQueue';
import { sleep } from '../utils';
import { Op } from 'sequelize';
import moment from 'moment';
import { MessageController } from '../controllers/controller.message';

export default async function (_, h: Helpers) {
  const queue = await LocalQueue.findAll({
    where: { runAt: { [Op.lte]: moment().toDate() } },
  });

  const messageController = new MessageController();

  if (!queue.length) {
    await sleep(5000);
  } else {
    for (const { message } of queue) {
      await messageController.executeMessage(message);
    }
  }

  await h.addJob('executeLocalQueue', {}, { jobKey: 'local_query' });
}
