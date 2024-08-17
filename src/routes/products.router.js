import { Router } from 'express';
import { productDto } from '../dtos/product.dto.js';
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

const router = Router();

router.post('/', (req, res, next) => {
  req.body = new ProductDTO(req.body);
  next();
}, createProduct);
router.get('/:id', getProductById); 
router.get('/', getProducts);
router.put('/:id', (req, res, next) => {
  req.body = new ProductDTO(req.body);
  next();
}, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
