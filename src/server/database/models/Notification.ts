import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Notification as NotificationType } from '../../websocket';
import { getUUID } from '../../utils';

@Table
export class Notification extends Model {
  @Column({ type: DataType.STRING, primaryKey: true, defaultValue: () => getUUID() })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  userId!: string;

  // TODO: Describe interface
  @Column({ type: DataType.JSONB, allowNull: false })
  notification!: NotificationType;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  seen!: boolean;
}
