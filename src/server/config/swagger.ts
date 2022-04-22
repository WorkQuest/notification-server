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
  unreadCount: number // Unread notifications count for user
  notifications: {
    id: string, // Notification id, that used in mark read and delete notifications
    userId: string, // Notification recipient userId
    queueName: string// Notification queue name
    seen: boolean // Whether the notification was read by the user
    createdAt: string (date in string) // Datetime when notification was created,
    notification: {
      recipients: string[], // Notification recipients here
      action: string, // Notification action here
      data: object // Notification data here
    }
  }
}
\`\`\`

---

### Available WebSocket Queues:
* __dao__ - notifications from WorkQuest DAO Platform, like discussions;
* __chat__ - notifications from chats;
* __quest__ - notifications from backend or contract about quest actions;
* __proposal__ - DAO Proposals notifications from contract;
* __referral__ - Referral Program notifications from contract;
* __pension_fund__ - Pension Fund notifications from contract and backend;
* __daily_liquidity__ - notifications for WQT_WBNB and WQT_WETH liquidity; 

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

__proposal:__



__referral:__
* RegisteredAffiliat
* RewardClaimed
* PaidReferral

__pension_fund:__



__daily_liquidity:__




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
