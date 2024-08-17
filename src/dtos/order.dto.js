import Joi from 'joi';

export const orderProductDto = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

export const orderDto = Joi.object({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  products: Joi.array().items(orderProductDto).required(),
  total: Joi.number().required(),
  status: Joi.string().valid('pending', 'completed', 'cancelled').required(),
  createdAt: Joi.date().required(),
});
