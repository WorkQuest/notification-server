import * as Qs from 'qs';
import * as Nes from '@hapi/nes';
import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as Bearer from 'hapi-auth-bearer-token';
import config from './config/config';
import { run } from 'graphile-worker';
import { initRabbitMQ } from './utils/rabbit';
import { initDatabase } from './database';
import { handleValidationError } from './utils';
import { dualAuthScheme } from './utils/auth';
import { initNesWebsocket } from './websocket';

export let publishInstance;
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

  await server.register([Inert, Vision, Bearer, Nes]);

  server.app.db = await initDatabase(true, true);
  server.app.rabbit = await initRabbitMQ();
  server.app.scheduler = await run({
    connectionString: config.database.link,
    concurrency: 5,
    pollInterval: 1000,
    taskDirectory: `${__dirname}/jobs`,
  });

  server.route({
    path: '/',
    method: 'GET',
    handler: async () => {
      await server.publish('/notifications/proposal', {
        event: 'ProposalCreated',
        authorId: 'a13ff74a-48e1-443a-9066-89e75g56430d',
        zhopa: 'da',
      });
    },
  });

  server.auth.scheme('dual-auth', dualAuthScheme);
  server.auth.strategy('dual-auth', 'dual-auth');
  server.auth.default('dual-auth');

  initNesWebsocket(server);
  publishInstance = server.publish;
  await server.app.scheduler.addJob('executeLocalQueue', {}, { jobKey: 'local_query' });

  try {
    await server.start();
    server.log('info', `Server running at: ${server.info.uri}`);
  } catch (err) {
    server.log('error', JSON.stringify(err));
  }
};

export { init };
