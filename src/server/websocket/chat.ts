import { Notification } from './index';

export default function (path, notification: Notification, options): boolean {
  if (!options.credentials.auth) {
    return false;
  }

  return notification.recipients.includes(options.credentials.id);
}
