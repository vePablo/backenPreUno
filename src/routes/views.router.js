import { Router } from 'express';
import { __dirname } from '../helpers/path.js';
import fs from 'fs';
import ProductManager from '../managers/product.manager.js';

const router = Router();
const productManager = new ProductManager(`${__dirname}/db/products.json`);

router.get('/', (req, res) => {
    const productsFilePath = `${__dirname}/db/products.json`;
    fs.readFile(productsFilePath, 'utf-8', (error, data) => {
        if (error) {
            console.log(`Error al leer el archivo: ${error.message}`);
            return res.status(500).render('error', { title: 'Error', message: 'Error al cargar los productos. Inténtelo de nuevo más tarde.', error });
        }
        const prds = JSON.parse(data);
        res.render('home', { title: 'Bienvenidos', prds });
    });
});

router.get('/realtimeproducts', (req, res) => {
    const productsFilePath = `${__dirname}/db/products.json`;
    fs.readFile(productsFilePath, 'utf-8', (error, data) => {
        if (error) {
            console.log(`Error al leer el archivo: ${error.message}`);
            return res.status(500).render('error', { title: 'Error', message: 'Error al cargar los productos. Inténtelo de nuevo más tarde.', error });
        }
        const prds = JSON.parse(data);
        res.render('ralTimeProducts', { title: 'Real-Time Products', prds });
    });
});

router.post('/add-product', async (req, res) => {
    try {
        const productData = req.body;
        await productManager.createProduct(productData);
        res.redirect('/realtimeproducts'); 
    } catch (error) {
        console.log(`Error al agregar el producto: ${error.message}`);
        res.status(500).render('error', { title: 'Error', message: 'Error al agregar el producto. Inténtelo de nuevo más tarde.', error });
    }
});

export default router;
