import { Router } from 'express';
import cartRouter from './cart.router.js';
import orderRouter from './order.router.js';
import productRouter from './products.router.js';
import sessionRouter from './session.router.js';
import userRouter from './user.router.js';
import mocksRouter from './mocks.router.js';

const router = Router();

router.use('/carts', cartRouter);
router.use('/orders', orderRouter);
router.use('/products', productRouter);
router.use('/sessions', sessionRouter);
router.use('/users', userRouter);
router.use('/mocks', mocksRouter);

export default router;
