import { Router } from 'express';
import { orderDto } from '../dtos/order.dto.js';
import {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  addProductToOrder,
  removeProductFromOrder,
  clearOrder,
  purchaseOrder
} from '../controllers/order.controller.js';

const router = Router();


router.get('/:id', getOrderById); 

router.post('/', (req, res, next) => {
  const { error, value } = orderDto.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  req.body = value;
  next();
}, createOrder); 

router.post('/:id/products', (req, res, next) => {
  const { error, value } = cartProductDto.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  req.body = value;
  next();
}, addProductToOrder);

router.put('/:id', (req, res, next) => {
  const { error, value } = orderDto.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  req.body = value;
  next();
}, updateOrder);

router.delete('/:id', deleteOrder);
router.delete('/:id/products/:productId', removeProductFromOrder);
router.delete('/:id/products', clearOrder);
router.post('/:id/purchase', purchaseOrder);

export default router;
