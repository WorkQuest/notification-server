import config from './config';

export default {
  pathPrefixSize: 2,
  basePath: '/api/',
  host: process.env.LOCAL ? 'localhost:3005' : config.baseUrl.replace('https://', ''),
  grouping: 'tags',
  schemes: ['https', 'http'],
  info: {
    title: 'WorkQuest Notifications Service Backend  - API Documentation',
    version: '',
    description: `
# API Documentation

You can use https://mdenushev.github.io/nes-cli/ to test WebSocket connections

---

__Connect to WebSocket:__
* __without auth__ - null must be passed in the Authorization field;
* __with main backend JWT-token__
* __with admin backend JWT-token__

---

__Responses from WebSocket:__
\`\`\`
{
  recipients: string[], // Notification recipients here
  action: string, // Notification action here
  data: object // Notification data here
}
\`\`\`

__Responses from REST API:__
\`\`\`
{
  count: number, // Notifications count for user
  unreadCount: number, // Unread notifications count for user
  notifications: {
    id: string, // Notification id, that used in mark read and delete notifications
    userId: string, // Notification recipient userId
    queueName: string, // Notification queue name
    seen: boolean, // Whether the notification was read by the user
    createdAt: string (date in string), // Datetime when notification was created,
    notification: {
      recipients: string[], // Notification recipients here
      action: string, // Notification action here
      data: object // Notification data here
    }
  }
}
\`\`\`

---

### Available Queues:
* __dao__ - notifications from WorkQuest DAO Platform, like discussions;
* __chat__ - notifications from chats;
* __quest__ - notifications from backend or contract about quest actions;
* __report__ - notifications about report decide;
* __bridge__ - notifications from bridge;
* __proposal__ - DAO Proposals notifications from contract;
* __referral__ - Referral Program notifications from contract;
* __bridge_usdt__ - notification from bridge usdt;
* __pension_fund__ - notifications from Pension Fund;
* __daily_liquidity__ - notifications for WQT_WBNB and WQT_WETH liquidity; 

---

### Available WebSocket Subscriptions
* __/notifications/dao__ - need JWT auth;
* __/notifications/chat__ - need JWT auth;
* __/notifications/quest__ - need JWT auth;
* __/notifications/report__ - need JWT auth;
* __/notifications/dailyLiquidity__ - without auth.
* __/notifications/bridge/{address}__ - without auth;
* __/notifications/proposal/{address}__ - without auth;
* __/notifications/referral/{address}__ - without auth;
* __/notifications/bridgeUsdt/{address}__ - without auth;
* __/notifications/pensionFund/{address}__ - without auth;
---

### Queues actions:
__quest:__
* questEdited 
* questEditedOnContract
* questStatusUpdated
* questEndSoon
* workerRejectedQuest
* workerAcceptedQuest
* workerRespondedToQuest
* employerInvitedWorkerToQuest
* workerAcceptedInvitationToQuest
* workerRejectedInvitationToQuest
* employerRejectedWorkersResponse
* userLeftReviewAboutQuest
* openDispute

__dao:__
* newDiscussionLike
* newCommentInDiscussion
* commentLiked
* replyToComment

__chat:__
* groupChatCreate
* groupChatAddUser
* groupChatDeleteUser
* groupChatLeaveUser
* messageReadByRecipient
* newMessage

__pensionFund:__
* Withdrew
* Received
* WalletUpdated

__proposal:__
* ProposalCreated
* VoteCast
* ProposalExecuted

__bridge:__
* SwapInitialized
* SwapRedeemed

__bridgeUsdt:__
* SwapInitialized
* TransactionError
* TransactionSuccessful

__report:__
* ReportDecided
* ReportRejected
* ReportSubmitted

__referral:__
* RegisteredAffiliat
* RewardClaimed
* PaidReferral

__dailyLiquidity:__
* DailyLiquidityWqtWbnb
* DailyLiquidityWqtWeth
    `,
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      'x-keyPrefix': 'Bearer ',
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
  jsonPath: '/documentation.json',
  documentationPath: '/documentation',
  debug: true,
};
