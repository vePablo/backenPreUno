import { Router } from 'express';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrder,
  deleteOrder
} from '../controllers/order.controller.js';

const router = Router();

router.post('/', createOrder); 
router.get('/:id', getOrderById); 
router.get('/', getOrders); 
router.put('/:id', updateOrder); 
router.delete('/:id', deleteOrder); 

export default router;
