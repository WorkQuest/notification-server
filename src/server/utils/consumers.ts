import { Queue } from "../queues";

export enum ConsumerQueues {}

Object.keys(Queue).map(queueName => {
  const enumKey = queueName.split('_').map(val => val.charAt(0).toUpperCase() + val.slice(1)).join('');

  ConsumerQueues[enumKey] = queueName;
});