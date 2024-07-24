import { Router } from 'express';
import ProductService from '../services/product.services.js';
import CartService from '../services/cart.services.js';

const router = Router();

router.get('/products', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;
        const options = {
            limit: parseInt(limit, 10),
            page: parseInt(page, 10),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
        };
        const filters = query ? { category: query } : {};
        const result = await ProductService.getProducts(filters, options);
        res.render('products', {
            title: 'Productos',
            products: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            limit,
            query
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/carts', async (req, res) => {
    try {
        const carts = await CartService.getCarts();
        res.render('carts', { title: 'Carritos', carts });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
