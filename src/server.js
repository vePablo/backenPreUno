import express from "express";
import { Server } from "socket.io";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import { __dirname } from "./helpers/path.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { join } from "path";
import ProductManager from './managers/product.manager.js';
import fs from 'fs';

const app = express();

const productManager = new ProductManager(`${__dirname}/db/products.json`);

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Middleware 
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//rutas
app.use("/api/carts", cartRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

//mnejo de errores
app.use(errorHandler);

const PORT = 8080;

// io
const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log('🟢 Cliente conectado');

    socket.on('add-product', async (productData) => {
        try {
            const newProduct = await productManager.createProduct(productData);
            console.log('Nuevo producto creado:', newProduct);
            socketServer.emit('product-list-update', newProduct); 
        } catch (error) {
            console.log('Error al crear el nuevo producto:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('🔴 Cliente desconectado');
    });
});
