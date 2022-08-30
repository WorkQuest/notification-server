# WorkQuest Notifications Center

> WorkQuest notifications center for receiving WebSocket notifications, REST notifications and push-notifications.

___

## Requirements

- PostgreSQL >= 12.9
- RabbitMQ
- NodeJS >= 16.13.0
- TypeScript >= 4.6.3

> For the project to work, you need to create an .env file from the .env.example template and insert google-firebase push config file in project root folder

___

## Folders structure

    ├── .github                     # GitHub CI
    ├── ci-scripts                  # Deploy tasks and templates
    ├── locale                      # Localization files for push-notifications
    ├── src                         # Source directory
    │   ├── server                  # Server directory
    │   │   ├── api                 # Notifications REST API handlers
    │   │   ├── config              # Config files for project, logger and swagger
    │   │   ├── controllers         # Receive message controllers from RabbitMQ
    │   │   ├── database            # Database Sequelize models and schemes
    │   │   ├── jobs                # Scheduler jobs
    │   │   ├── queues              # Message handlers for RabbitMQ queues
    │   │   ├── routes              # Notifications REST API routes
    │   │   ├── utils               # Utilities folder
    │   │   ├── websocket           # Websocket options and subscription for queues
    │   │   └── index.ts            # Main server creating file
    │   └── main.ts                 # Execute project file
    ├── LICENSE
    └── README.md

---

## Start project

Start in watch mode:

```
npm start
```

Build project:

```
npm run build
```

Build and start:

```
npm run compile
```

---

## Available Queues:

> * __dao__ - notifications from WorkQuest DAO Platform, like discussions;
> * __chat__ - notifications from chats;
> * __quest__ - notifications from backend or contract about quest actions;
> * __report__ - notifications about report decide;
> * __bridge__ - notifications from bridge;
> * __proposal__ - DAO Proposals notifications from contract;
> * __referral__ - Referral Program notifications from contract;
> * __bridge_usdt__ - notification from bridge usdt;
> * __pension_fund__ - notifications from Pension Fund;
> * __loan_auction__ - notifications from loan auction;
> * __oracle_prices__ - notification about oracle prices update;
> * __loan_collateral__ - notifications from collateral;
> * __daily_liquidity__ - notifications for WQT_WBNB and WQT_WETH liquidity.

---

## Available WebSocket Subscriptions
> * __/notifications/dao__ - need JWT auth;
> * __/notifications/chat__ - need JWT auth;
> * __/notifications/quest__ - need JWT auth;
> * __/notifications/report__ - need JWT auth;
> * __/notifications/referral__ - need JWT auth;
> * __/notifications/loan-auction__ - without auth;
> * __/notifications/oracle-prices__ - without auth;
> * __/notifications/dailyLiquidity__ - without auth.
> * __/notifications/bridge/{address}__ - without auth;
> * __/notifications/proposal/{address}__ - without auth;
> * __/notifications/bridgeUsdt/{address}__ - without auth;
> * __/notifications/pensionFund/{address}__ - without auth;
> * __/notifications/loan-collateral/{address}__ - without auth.

---

## Queues actions:
> ### Quest:
> * questEdited
> * questEditedOnContract
> * questStatusUpdated
> * questEndSoon
> * workerRejectedQuest
> * workerAcceptedQuest
> * workerRespondedToQuest
> * employerInvitedWorkerToQuest
> * workerAcceptedInvitationToQuest
> * workerRejectedInvitationToQuest
> * employerRejectedWorkersResponse
> * userLeftReviewAboutQuest
> * openDispute

> ### DAO:
> * newDiscussionLike
> * newCommentInDiscussion
> * commentLiked
> * replyToComment

> ### Chat:
> * groupChatCreate
> * groupChatAddUser
> * groupChatDeleteUser
> * groupChatLeaveUser
> * messageReadByRecipient
> * newMessage

> ### PensionFund:
> * Withdrew
> * Received
> * WalletUpdated

> ### Proposal:
> * ProposalCreated
> * VoteCast
> * ProposalExecuted

> ### Bridge:
> * SwapInitialized
> * SwapRedeemed

> ### BridgeUsdt:
> * SwapInitialized
> * TransactionError
> * TransactionSuccessful

> ### Report:
> * ReportDecided
> * ReportRejected
> * ReportSubmitted

> ### Referral:
> * RegisteredAffiliat
> * RewardClaimed
> * PaidReferral

> ### DailyLiquidity:
> * DailyLiquidityWqtWbnb
> * DailyLiquidityWqtWeth

> ### OraclePrices:
> * DeterminationPriceUpdated

> ### LoanAuction:
> * Bought
> * Started
> * Canceled
> * Liquidated
> * NotLiquidate

> ### LoanCollateral:
> * Moved
> * Removed
> * Produced
> * UpdatedPrices