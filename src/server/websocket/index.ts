import { questSubscriptionOption } from './websocket.quest';
import { chatSubscriptionOption } from './websocket.chat';
import { proposalSubscriptionOption } from './websocket.proposal';
import { dailyLiquiditySubscriptionOption } from './websocket.dailyLiquidity';
import { bridgeSubscriptionOption } from './websocket.bridge';
import { daoSubscriptionOption } from './websocket.dao';
import { referralSubscriptionOption } from './websocket.referral';
import { pensionFundSubscriptionOption } from './websocket.pensionFund';
import { reportSubscriptionOption } from './websocket.report';

export function initNesWebsocket(server) {
  server.subscription(daoSubscriptionOption.path, daoSubscriptionOption.option);
  server.subscription(chatSubscriptionOption.path, chatSubscriptionOption.option);
  server.subscription(questSubscriptionOption.path, questSubscriptionOption.option);
  server.subscription(bridgeSubscriptionOption.path, bridgeSubscriptionOption.option);
  server.subscription(reportSubscriptionOption.path, reportSubscriptionOption.option);
  server.subscription(proposalSubscriptionOption.path, proposalSubscriptionOption.option);
  server.subscription(referralSubscriptionOption.path, referralSubscriptionOption.option);
  server.subscription(pensionFundSubscriptionOption.path, pensionFundSubscriptionOption.option);
  server.subscription(
    dailyLiquiditySubscriptionOption.path,
    dailyLiquiditySubscriptionOption.option,
  );
}
