import * as Joi from 'joi';

export const paginationLimitSchema = Joi.string()
  .min(0)
  .default(10)
  .example(10)
  .label('PaginationLimitSchema');
export const paginationOffsetSchema = Joi.string()
  .min(0)
  .default(0)
  .example(0)
  .label('PaginationOffsetSchema');

export const paginationSchema = Joi.object({
  limit: paginationLimitSchema,
  offset: paginationOffsetSchema,
}).label('PaginationSchema');
