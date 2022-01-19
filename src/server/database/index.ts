import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import { LocalQueue } from './models/LocalQueue';
import { Notification } from './models/Notification';

export async function initDatabase(logging = false, sync = false) {
  const sequelize = new Sequelize(config.database.link, {
    logging: logging ? console.log : logging,
    dialect: 'postgres',
    models: [LocalQueue, Notification],
  });

  if (sync) {
    await sequelize.sync();
  }

  return sequelize;
}
