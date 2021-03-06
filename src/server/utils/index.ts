import * as Joi from 'joi';
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

export function output(res?: object | null): object {
  return {
    ok: true,
    result: res,
  };
}

export function responseHandler(r, h) {
  // Handle default hapi errors (like not found, etc.)
  if (r.response.isBoom && r.response.data === null) {
    r.response = h
      .response({
        ok: false,
        code: Math.floor(r.response.output.statusCode * 1000),
        data: {},
        msg: r.response.message,
      })
      .code(r.response.output.statusCode);

    return h.continue;
  }
  // Handle custom api error
  if (r.response.isBoom && r.response.data.api) {
    r.response = h
      .response({
        ok: false,
        code: r.response.data.code,
        data: r.response.data.data,
        msg: r.response.output.payload.message,
      })
      .code(Math.floor(r.response.data.code / 1000));

    return h.continue;
  }
  // Handle non api errors with data
  if (r.response.isBoom && !r.response.data.api) {
    r.response = h
      .response({
        ok: false,
        code: Math.floor(r.response.output.statusCode * 1000),
        data: r.response.data,
        msg: r.response.message,
      })
      .code(r.response.output.statusCode);

    return h.continue;
  }

  return h.continue;
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

export const emptyOkSchema = Joi.object({
  ok: Joi.boolean().example(true),
}).label('EmptyOkResponse');

export const outputOkSchema = (res: Joi.Schema): Joi.Schema => {
  return Joi.object({
    ok: Joi.boolean().example(true),
    result: res,
  });
};

export function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function getUUID(): string {
  return uuidv4();
}
