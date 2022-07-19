import * as Qs from 'qs';
import * as Nes from '@hapi/nes';
import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as HapiCors from 'hapi-cors';
import * as Vision from '@hapi/vision';
import * as HapiPulse from 'hapi-pulse';
import * as Bearer from 'hapi-auth-bearer-token';
import routes from './routes';
import config from './config/config';
import SwaggerOptions from './config/swagger';
import appInstances from './config/appInstances';
import { run, Logger as graphileLogger } from 'graphile-worker';
import { initDatabase } from './database';
import { handleValidationError, responseHandler } from './utils';
import { dualAuthScheme, tokenValidate } from './utils/auth';
import { rabbitController } from './controllers/controller.rabbit';
import { initNesWebsocket } from './websocket';
import { Logger } from "./config/pino";

const HapiSwagger = require('hapi-swagger');
const Package = require('../../package.json');

SwaggerOptions.info.version = Package.version;

function logFactory() {
  return (level, message, meta) => {
    if (level !== 'debug') {
      Logger[level](message);
    }
  }
}

const init = async () => {
  const server = await new Hapi.Server({
    port: config.server.port,
    host: config.server.host,
    query: { parser: (query) => Qs.parse(query) },
    routes: {
      validate: {
        options: { abortEarly: false },
        failAction: handleValidationError,
      },
      response: { failAction: 'log' },
    },
  });

  server.realm.modifiers.route.prefix = '/api';

  await server.register([
    Inert,
    Vision,
    Bearer,
    Nes,
    { plugin: HapiSwagger, options: SwaggerOptions },
  ]);

  const logger = new graphileLogger(logFactory);

  server.app.db = await initDatabase(false, true);
  server.app.scheduler = await run({
    logger,
    connectionString: config.database.link,
    concurrency: 5,
    pollInterval: 1000,
    taskDirectory: `${__dirname}/jobs`,
  });

  server.auth.scheme('dual-auth', dualAuthScheme);
  server.auth.strategy('dual-auth', 'dual-auth');
  server.auth.strategy('jwt-access', 'bearer-access-token', {
    validate: tokenValidate,
  });
  server.auth.default('dual-auth');

  server.route(routes);

  server.ext('onPreResponse', responseHandler);

  rabbitController.initMessageBroker();
  initNesWebsocket(server);

  await server.app.scheduler.addJob('executeLocalQueue', {}, { jobKey: 'local_query' });

  await server.register({
    plugin: HapiPulse,
    options: {
      timeout: 15000,
      signals: ['SIGINT'],
    },
  });

  await server.register({
    plugin: HapiCors,
    options: config.cors,
  });

  appInstances.server = server;
  appInstances.database = server.app.db;
  appInstances.scheduler = server.app.scheduler;

  try {
    await server.start();
    server.log('info', `Server running at: ${server.info.uri}`);
  } catch (err) {
    server.log('error', JSON.stringify(err));
  }
};

export { init };
