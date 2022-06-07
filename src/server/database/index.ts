import { Notification } from './models/Notification';
import { LocalQueue } from './models/LocalQueue';
import { Sequelize } from 'sequelize-typescript';
import { PushToken } from './models/PushToken';
import config from '../config/config';

export async function initDatabase(logging = false, sync = false) {
  const sequelize = new Sequelize(config.database.link, {
    logging: logging ? console.log : logging,
    dialect: 'postgres',
    models: [LocalQueue, Notification, PushToken],
  });

  if (sync) {
    await sequelize.sync();
  }

  return sequelize;
}
