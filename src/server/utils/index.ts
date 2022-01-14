import moment, { Moment } from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { Boom } from '@hapi/boom';

export type Queue<T = object> = {
  description: string;
  execute(content: object | string, message: T): void;
};

export type Queues<T = object> = {
  [name: string]: Queue<T>;
};

export function error(code: number, msg: string, data: object): Boom {
  return new Boom(msg, {
    data: {
      code,
      data,
      api: true,
    },
    statusCode: Math.floor(code / 1000),
  });
}

export async function handleValidationError(r, h, err) {
  return error(
    400000,
    'Validation error',
    err.details.map((e) => {
      return { field: e.context.key, reason: e.type.replace('any.', '') };
    }),
  );
}

export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function getUUID(): string {
  return uuidv4();
}
