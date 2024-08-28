import CartDAO from '../daos/cart.dao.js';
import ProductDAO from '../daos/product.dao.js';
import TicketManager from '../managers/ticket.manager.js'; 
import Product from '../models/product.models.js';

class CartService {
  async createCart(data) {
    return await CartDAO.createCart(data);
  }

  async getCartById(id) {
    return await Cart.findById(id).populate('products.product');
  }

  async updateCart(id, data) {
    return await CartDAO.updateCart(id, data);
  }

  async deleteCart(id) {
    return await CartDAO.deleteCart(id);
  }

  async addProductToCart(cartId, productId, quantity) {
    // Verificar si el producto existe
    const productExists = await Product.findById(productId);
    if (!productExists) {
      throw new Error('Producto no encontrado');
    }
    // Llamar al DAO para agregar el producto al carrito
    return await CartDAO.addProductToCart(cartId, { productId, quantity });
  }

  async removeProductFromCart(cartId, productId) {
    return await CartDAO.removeProductFromCart(cartId, productId);
  }

  async clearCart(cartId) {
    return await CartDAO.updateCart(cartId, { products: [] });
  }

  async purchaseCart(cartId, userEmail) {
    const cart = await CartDAO.getCartById(cartId);
  
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
  
    // Verificar stock usando productos ya poblados
    const productsWithoutStock = cart.products.filter(p => p.product.stock < p.quantity);
  
    if (productsWithoutStock.length > 0) {
      throw new Error(`Stock insuficiente para los productos: ${productsWithoutStock.map(p => p.product.name).join(', ')}`);
    }
  
    // Descontar stock
    await Promise.all(cart.products.map(async (p) => {
      p.product.stock -= p.quantity;
      await Product.findByIdAndUpdate(p.product._id, { stock: p.product.stock });
    }));
  
    // Obtener el ID del usuario usando su correo electrónico
    const user = await UserDAO.getUserByEmail(userEmail);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const userId = user._id;
  
    // Crear ticket
    const ticket = await TicketManager.createTicket(cart, userId, userEmail);
  
    // Limpiar carrito
    await this.clearCart(cartId);
  
    return ticket;
  }
  
}

export default new CartService();
