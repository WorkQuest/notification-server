import { MessageController } from '../controllers/controller.message';
import { LocalQueue } from '../database/models/LocalQueue';
import { Helpers } from 'graphile-worker';
import { Logger } from "../config/pino";
import { sleep } from '../utils';
import { Op } from 'sequelize';
import moment from 'moment';

export default async function (_, h: Helpers) {
  const queue = await LocalQueue.findAll({
    where: {
      runAt: { [Op.lte]: moment().toDate() },
      attempts: { [Op.lte]: 25 }
    },
  });

  const messageController = new MessageController();

  if (!queue.length) {
    await sleep(5000);
  } else {
    for (const { message } of queue) {
      await messageController.executeMessage(message);
    }

    Logger.info(queue.length, 'Executed "%s" messages with error');
  }

  await h.addJob('executeLocalQueue', {}, { jobKey: 'local_query' });
}
