import { Queues } from '../utils';
import { bridgeNotifications } from './bridge';
import { proposalNotifications } from './proposal';
import { dailyLiquidityNotifications } from './dailyLiquidity';
import { chatNotifications } from './chat';
import { questNotifications } from './quest';
import { daoNotifications } from './dao';
import { referralNotifications } from './referral';
import { pensionFundNotifications } from './pensionFund';
import { bridgeUsdtNotification } from "./bridgeUsdt";
import { userNotifications } from "./user";
import { reportNotifications } from "./report";
import { loanAuctionNotifications } from "./loan-auction";
import { LoanCollateralNotification } from "./loan-collateral";
import { oraclePricesNotifications } from "./oracle-prices";

// Commands list
export const Queue: Queues = {
  oracle_prices: {
    description: "Oracle prices",
    execute: oraclePricesNotifications,
  },
  loan_collateral: {
    description: 'Notifications from loan collateral',
    execute: LoanCollateralNotification,
  },
  loan_auction: {
    description: 'Notifications from loan auction',
    execute: loanAuctionNotifications,
  },
  bridge: {
    description: 'Notifications from bridge service by wallet address',
    execute: bridgeNotifications,
  },
  proposal: {
    description: 'Notifications for proposals from WorkQuest DAO',
    execute: proposalNotifications,
  },
  daily_liquidity: {
    description: 'Notifications from Daily Liquidity service for all users',
    execute: dailyLiquidityNotifications,
  },
  chat: {
    description: 'Notifications from chat',
    execute: chatNotifications,
  },
  quest: {
    description: 'Quest notifications from WorkQuest platform',
    execute: questNotifications,
  },
  dao: {
    description: 'Quest notifications for dao discussions',
    execute: daoNotifications,
  },
  user: {
    description: 'Default user notifications',
    execute: userNotifications,
  },
  report: {
    description: 'Report user notifications',
    execute: reportNotifications,
  },
  referral: {
    description: 'Referral program notifications',
    execute: referralNotifications,
  },
  pension_fund: {
    description: 'Pension Fund notifications by wallet address',
    execute: pensionFundNotifications,
  },
  bridge_usdt: {
    description: 'Notifications from bridge USDT service by wallet address',
    execute: bridgeUsdtNotification
  },
};
