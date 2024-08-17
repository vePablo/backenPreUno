import { Router } from 'express';
import cartRouter from './cart.router.js';
import orderRouter from './order.router.js';
import productRouter from './products.router.js';
import sessionRouter from './session.router.js';
import userRouter from './user.router.js';
import ticketRouter from './ticket.router.js';

const router = Router();

router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/sessions', sessionRouter);
router.use('/users', userRouter);
router.use('/tickets', ticketRouter);

export default router;
