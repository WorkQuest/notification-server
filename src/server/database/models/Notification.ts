import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../../utils';

interface INotificationData {
  recipients: string[];
  action: string;
  data: object;
}

@Table
export class Notification extends Model {
  @Column({ type: DataType.STRING, primaryKey: true, defaultValue: () => getUUID() })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  userId!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  queueName!: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  notification!: INotificationData;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  seen!: boolean;
}
