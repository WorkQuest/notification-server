import { questSubscriptionOption } from './websocket.quest';
import { chatSubscriptionOption } from './websocket.chat';
import { proposalSubscriptionOption } from './websocket.proposal';
import { dailyLiquiditySubscriptionOption } from './websocket.dailyLiquidity';
import { bridgeSubscriptionOption } from './websocket.bridge';
import { daoSubscriptionOption } from './websocket.dao';

export function initNesWebsocket(server) {
  server.subscription(daoSubscriptionOption.path, daoSubscriptionOption.option);
  server.subscription(chatSubscriptionOption.path, chatSubscriptionOption.option);
  server.subscription(questSubscriptionOption.path, questSubscriptionOption.option);
  server.subscription(bridgeSubscriptionOption.path, bridgeSubscriptionOption.option);
  server.subscription(proposalSubscriptionOption.path, proposalSubscriptionOption.option);
  server.subscription(
    dailyLiquiditySubscriptionOption.path,
    dailyLiquiditySubscriptionOption.option,
  );
}
