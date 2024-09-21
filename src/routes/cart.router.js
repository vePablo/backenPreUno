import { Router } from 'express';
import passport from 'passport';
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

router.get('/:id', passport.authenticate('jwt', { session: false }), getCartById);
router.get('/user/:userId', passport.authenticate('jwt', { session: false }), getCartByUserId);
router.post('/', passport.authenticate('jwt', { session: false }), createCart);
router.post('/:id/products', passport.authenticate('jwt', { session: false }), addProductToCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.delete('/:id/products/:productId', removeProductFromCart);
router.delete('/:id/products', clearCart);
router.post('/:id/purchase', passport.authenticate('jwt', { session: false }), purchaseCart);
//Cannot read properties of undefined (reading 'stock') 
//revisa la funcion que maneja el stock
//Problemas con las cookies en el momento de hacer purcahse: Authorization Header: undefined
//Use una opcion de autorizacion que tiene thunder client y pase el token manualmente y funciono.
// Revisa getproductbyid "CartService.getCartById(...).populate is not a function"
// revisa como estas calculando el stock por que da 0 cuando obtienes el carrito


export default router;
