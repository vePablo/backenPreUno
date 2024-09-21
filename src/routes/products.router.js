import { Router } from 'express';
import {productValidator} from '../middlewares/productValidator.js';
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
  req.body = new productDto(req.body);
  next();
}, productValidator, createProduct);
router.get('/:id', getProductById); 
router.get('/', getProducts);
router.put('/:id', (req, res, next) => {
  req.body = new productDto(req.body);
  next();
}, productValidator, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
