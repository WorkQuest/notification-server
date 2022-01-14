import { Queues } from '../utils';
import { bridgeNotifications } from './bridge';
import { proposalNotifications } from './proposal';
import { dailyLiquidityNotifications } from './dailyLiquidity';

// Commands list
export const Queue: Queues = {
  bridge: {
    description: 'Notifications from bridge service for user connected to ws by wallet',
    execute: bridgeNotifications,
  },
  proposal: {
    description: 'Notifications from WorkQuest DAO Proposals for proposal authors',
    execute: proposalNotifications,
  },
  dailyLiquidity: {
    description: 'Notifications from Daily Liquidity service for all users',
    execute: dailyLiquidityNotifications,
  },
};
