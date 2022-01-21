import { Queues } from '../utils';
import { bridgeNotifications } from './bridge';
import { proposalNotifications } from './proposal';
import { dailyLiquidityNotifications } from './dailyLiquidity';
import { chatNotifications } from './chat';
import { platformNotification } from './platform';

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
  chat: {
    description: 'Notifications from chat',
    execute: chatNotifications,
  },
  platform: {
    description: 'Notification from WorkQuest platform (quest, workers and etc).',
    execute: platformNotification,
  },
};
