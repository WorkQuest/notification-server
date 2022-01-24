import { Notification } from '../database/models/Notification';
import { error, output } from '../utils';
import { Errors } from '../utils/error';

export async function getNotifications(r) {
  const { count, rows } = await Notification.findAndCountAll({
    where: { userId: r.auth.credentials.id },
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['createdAt', 'DESC']],
  });

  const unreadCount = await Notification.count({
    where: {
      userId: r.auth.credentials.id,
      seen: false,
    },
  });

  return output({ count, unreadCount, notifications: rows });
}

export async function deleteNotification(r) {
  const notification = await Notification.findByPk(r.payload.notificationId);

  if (!notification) {
    return error(Errors.NotFound, 'Notification not found', { field: ['notificationId'] });
  }

  await notification.destroy();

  return output({});
}

export async function markRead(r) {
  await Notification.update(
    {
      seen: true,
    },
    {
      where: { id: r.payload.notificationIds },
    },
  );

  return output({});
}
