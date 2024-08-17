import mongoose from 'mongoose';
import dotenv from 'dotenv'; 

dotenv.config(); 

const connectString = process.env.MONGO_URI || 'mongodb://localhost:27017/defaultDB'; 
const initMongoDB = async () => {
    try {
        if (!process.env.MONGO_URI) { 
            console.warn('MONGO_URI no está definido en el archivo .env. Usando URL de conexión predeterminada.');
        }
        await mongoose.connect(connectString);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};

initMongoDB();
