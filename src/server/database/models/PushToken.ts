import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../../utils';

@Table
export class PushToken extends Model {
  @Column({ type: DataType.STRING, primaryKey: true, defaultValue: () => getUUID() }) id: string;

  @Column({ type: DataType.STRING, allowNull: false }) userId: string;

  @Column({ type: DataType.STRING, allowNull: false }) token: string;
}
