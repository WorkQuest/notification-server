import { Column, DataType, Model, Table } from 'sequelize-typescript';
import moment from 'moment';

@Table({
  scopes: {
    defaultScope: {
      order: [['id', 'DESC']],
    },
  },
})
export class LocalQueue extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.JSONB, allowNull: false })
  message!: object;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  attempts!: number;

  @Column({ type: DataType.DATE })
  runAt!: Date;

  async addAttempt(): Promise<void> {
    this.attempts += 1;
    this.runAt = moment()
      .add(this.attempts * 5, 'seconds')
      .toDate();

    await this.save();
  }
}
