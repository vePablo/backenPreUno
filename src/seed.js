import mongoose from 'mongoose';
import Product from './models/product.models.js'; 

const products = [
  { name: 'Producto 1', description: 'Descripción 1', price: 100, category: 'Categoría 1', stock: 10 },
  { name: 'Producto 2', description: 'Descripción 2', price: 200, category: 'Categoría 2', stock: 5 },
  { name: 'Producto 3', description: 'Descripción 3', price: 300, category: 'Categoría 3', stock: 0 },
  { name: 'Producto 4', description: 'Descripción 4', price: 400, category: 'Categoría 1', stock: 20 },
  { name: 'Producto 5', description: 'Descripción 5', price: 500, category: 'Categoría 2', stock: 0 },
  { name: 'Producto 6', description: 'Descripción 6', price: 600, category: 'Categoría 3', stock: 3 },
];

mongoose.connect('mongodb+srv://admin:admin@cluster0.8vk9hbt.mongodb.net/testFinal1?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Product.insertMany(products);
    console.log('Productos insertados correctamente');
    mongoose.disconnect();
  })
  .catch(error => console.error('Error al conectar a MongoDB', error));
