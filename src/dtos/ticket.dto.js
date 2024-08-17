import Joi from 'joi';

export const ticketDto = Joi.object({
  id: Joi.string().required(),
  code: Joi.string().required(),
  purchase_datetime: Joi.date().required(),
  amount: Joi.number().required(),
  purchaser: Joi.string().email().required(),
});
