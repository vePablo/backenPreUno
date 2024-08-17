import Joi from 'joi';

export const productDto = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  stock: Joi.number().required(),
});
