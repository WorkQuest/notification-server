import bridge from './bridge';
import proposal from './proposal';
import dailyLiquidity from './dailyLiquidity';

export enum WebsocketPaths {
  Bridge = '/notifications/bridge/',
  Proposal = '/notifications/proposal',
  DailyLiquidity = '/notifications/dailyLiquidity',
}

export function initNesWebsocket(server) {
  server.subscription(`${WebsocketPaths.Bridge}{address}`, { filter: bridge });
  server.subscription(WebsocketPaths.Proposal, { filter: proposal });
  server.subscription(WebsocketPaths.DailyLiquidity, { filter: dailyLiquidity });
}
