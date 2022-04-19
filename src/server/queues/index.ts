import { Queues } from '../utils';
import { bridgeNotifications } from './bridge';
import { proposalNotifications } from './proposal';
import { dailyLiquidityNotifications } from './dailyLiquidity';
import { chatNotifications } from './chat';
import { questNotifications } from './quest';
import { daoNotifications } from './dao';
import { referralNotifications } from './referral';

// Commands list
export const Queue: Queues = {
  bridge: {
    description: 'Notifications from bridge service for user connected to ws by wallet',
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
  referral: {
    description: 'Referral program notifications',
    execute: referralNotifications,
  },
};
