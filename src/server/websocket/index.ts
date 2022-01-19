import bridge from './bridge';
import proposal from './proposal';
import dailyLiquidity from './dailyLiquidity';
import chat from './chat';

export type Notification = {
  action: string;
  recipients: string[];
  data: any;
};

export const enum WebsocketPaths {
  Bridge = '/notifications/bridge',
  Proposal = '/notifications/proposal',
  DailyLiquidity = '/notifications/dailyLiquidity',
  Chat = '/notifications/chat',
  Platform = '/notifications/platform',
}

export function initNesWebsocket(server) {
  server.subscription(WebsocketPaths.DailyLiquidity, { filter: dailyLiquidity });
  server.subscription(`${WebsocketPaths.Bridge}/{address}`, { filter: bridge });
  server.subscription(WebsocketPaths.Proposal, { filter: proposal });
  server.subscription(WebsocketPaths.Chat, { filter: chat });
}
