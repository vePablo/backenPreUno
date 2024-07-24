import express from 'express';
import { join } from 'path';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';

// Importar rutas
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/views.router.js';
import userRouter from './routes/user.router.js';
import sessionRouter from './routes/session.router.js';

// Importar middlewares
import { errorHandler } from './middlewares/errorHandler.js';

// Importar helper
import { __dirname } from './helpers/path.js';

// Importar conexión a la base de datos
import './db/connection.js';

const app = express();
const PORT = 8080;

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);
app.use('/api/users', userRouter); 
app.use('/api/sessions', sessionRouter);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
