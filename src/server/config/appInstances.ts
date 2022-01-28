import { Sequelize } from 'sequelize-typescript';

export type AppInstances = {
  server?: any;
  scheduler?: any;
  database?: Sequelize;
};

const appInstances: AppInstances = {};

export default appInstances;
