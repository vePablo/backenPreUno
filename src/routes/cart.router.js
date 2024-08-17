import { Router } from 'express';
import { cartDto } from '../dtos/cart.dto.js';
import {
  createCart,
  getCartById,
  updateCart,
  deleteCart,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  purchaseCart
} from '../controllers/cart.controler.js';

const router = Router();

router.get('/:id', getCartById); 
router.post('/', (req, res, next) => {
  const { error, value } = cartDto.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  req.body = value;
  next();
}, createCart); 


router.post('/:id/products', addProductToCart);

router.put('/:id', (req, res, next) => {
  const { error, value } = cartDto.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details });
  }
  req.body = value;
  next();
}, updateCart);

router.delete('/:id', deleteCart);
router.delete('/:id/products/:productId', removeProductFromCart);
router.delete('/:id/products', clearCart);
router.post('/:id/purchase', purchaseCart);

export default router;
