import { Router } from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

const router = Router();

router.post('/', createProduct); 
router.get('/:id', getProductById); 
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
