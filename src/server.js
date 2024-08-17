import express from 'express';
import { join } from 'path';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initializePassport } from './config/passport.config.js';
import dotenv from 'dotenv';
dotenv.config();


// Importar rutas
import indexRouter from './routes/index.router.js';
import viewsRouter from './routes/views.router.js';

// Importar middlewares
import { errorHandler } from './middlewares/errorHandler.js';

// Importar helper
import { __dirname } from './helpers/path.js';

// Importar conexión a la base de datos
import './db/connection.js';

const app = express();
const PORT = process.env.PORT;

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
app.use('/api', indexRouter);
app.use('/', viewsRouter);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
