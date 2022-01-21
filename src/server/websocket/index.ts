import { questSubscriptionOption } from './websoket.quest';
import { chatSubscriptionOption } from './websoket.chat';
import { proposalSubscriptionOption } from './websoket.proposal';
import { dailyLiquiditySubscriptionOption } from './websoket.dailyLiquidity';
import { bridgeSubscriptionOption } from './websoket.bridge';

export function initNesWebsocket(server) {
  server.subscription(chatSubscriptionOption.path, chatSubscriptionOption.option);
  server.subscription(questSubscriptionOption.path, questSubscriptionOption.option);
  server.subscription(bridgeSubscriptionOption.path, bridgeSubscriptionOption.option);
  server.subscription(proposalSubscriptionOption.path, proposalSubscriptionOption.option);
  server.subscription(dailyLiquiditySubscriptionOption.path, dailyLiquiditySubscriptionOption.option);
}
