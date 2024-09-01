import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { purchaseCart } from '../controllers/purchase.controllers.js';
import {
  createCart,
  getCartById,
  updateCart,
  deleteCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
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
router.post('/:id/purchase', authMiddleware, purchaseCart);
//Cannot read properties of undefined (reading 'stock') 
//revisa la funcion que maneja el stock
//Problemas con las cookies en el momento de hacer purcahse: Authorization Header: undefined
export default router;
