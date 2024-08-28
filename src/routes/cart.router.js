import { Router } from 'express';
import {
  createCart,
  getCartById,
  updateCart,
  deleteCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  purchaseCart,
  getCartByUserId
} from '../controllers/cart.controler.js';

const router = Router();

router.get('/:id', getCartById);
router.get('/user/:userId', getCartByUserId);
router.post('/', createCart);
router.post('/:id/products', addProductToCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.delete('/:id/products/:productId', removeProductFromCart);
router.delete('/:id/products', clearCart);
router.post('/:id/purchase', purchaseCart);

export default router;
