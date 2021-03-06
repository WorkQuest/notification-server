import { questSubscriptionOption } from './websocket.quest';
import { chatSubscriptionOption } from './websocket.chat';
import { proposalSubscriptionOption } from './websocket.proposal';
import { dailyLiquiditySubscriptionOption } from './websocket.dailyLiquidity';
import { bridgeSubscriptionOption } from './websocket.bridge';
import { daoSubscriptionOption } from './websocket.dao';
import { referralSubscriptionOption } from './websocket.referral';
import { pensionFundSubscriptionOption } from './websocket.pensionFund';
import { reportSubscriptionOption } from './websocket.report';
import { bridgeUsdtSubscriptionOption } from "./websocket.bridgeUsdt";

export function initNesWebsocket(server) {
  [
    daoSubscriptionOption,
    chatSubscriptionOption,
    questSubscriptionOption,
    bridgeSubscriptionOption,
    reportSubscriptionOption,
    proposalSubscriptionOption,
    referralSubscriptionOption,
    bridgeUsdtSubscriptionOption,
    pensionFundSubscriptionOption,
    dailyLiquiditySubscriptionOption
  ].forEach(({ option, path }) => server.subscription(path, option))
}
