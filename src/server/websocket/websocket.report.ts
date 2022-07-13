import { Credentials } from '../types';
import appInstances from '../config/appInstances';

export enum ReportNotificationActions {
  ReportDecided = 'ReportDecided',
  ReportRejected = 'ReportRejected',
  ReportSubmitted = 'ReportSubmitted',
}

export type ReportNotificationPayload = {
  data: any; // TODO
  recipients: string[];
  action: ReportNotificationActions;
};

const reportSubscriptionFilter = async function (
  path: string,
  notificationPayload: ReportNotificationPayload,
  options: { credentials: Credentials },
): Promise<boolean> {
  return options.credentials.auth
    ? notificationPayload.recipients.includes(options.credentials.id)
    : false;
};

export const reportSubscriptionOption = {
  path: '/notifications/report',
  option: { filter: reportSubscriptionFilter },
};

export async function publishReportNotifications(notificationPayload: ReportNotificationPayload) {
  return appInstances.server.publish(reportSubscriptionOption.path, notificationPayload);
}
