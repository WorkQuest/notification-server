import { Notification } from '../database/models/Notification';
import { error, output } from '../utils';
import { Errors } from '../utils/error';
import { Op } from 'sequelize';

export async function getNotifications(r) {
  const { count, rows } = await Notification.findAndCountAll({
    where: {
      [Op.and]: {
        userId: r.auth.credentials.id,
        queueName: { [Op.notIn]: r.query.exclude },
      },
    },
    limit: r.query.limit,
    offset: r.query.offset,
    order: [['createdAt', 'DESC']],
  });

  const unreadCount = await Notification.count({
    where: {
      [Op.and]: {
        userId: r.auth.credentials.id,
        seen: false,
        queueName: { [Op.notIn]: r.query.exclude },
      },
    },
  });

  return output({ count, unreadCount, notifications: rows });
}

export async function deleteNotification(r) {
  const notification = await Notification.findByPk(r.params.notificationId);

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

  return output();
}

export async function markAllRead(r) {
  if (!r.auth.credentials.id) {
    return output();
  }

  await Notification.update({
    seen: true,
  }, {
    where: { userId: r.auth.credentials.id },
  });

  return output();
}
