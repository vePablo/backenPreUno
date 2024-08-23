import CartDAO from '../daos/cart.dao.js';
import ProductDAO from '../daos/product.dao.js';
import TicketManager from '../managers/ticket.manager.js'; 

class CartService {
  async createCart(data) {
    return await CartDAO.createCart(data);
  }

  async getCartById(id) {
    return await CartDAO.getCartById(id);
  }

  async getCartByUserId(userId) {
    return await CartDAO.getCartByUserId(userId);
  }

  async updateCart(id, data) {
    return await CartDAO.updateCart(id, data);
  }

  async deleteCart(id) {
    return await CartDAO.deleteCart(id);
  }

  
  async addProductsToCart(cartId, products) {
    if (!Array.isArray(products)) {
      console.log('Service error: Products should be an array');
      throw new Error('Products should be an array');
    }
  
    console.log('Service: Adding products to cart:', products);
    return await CartDAO.addProductsToCart(cartId, products);
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
      throw new Error('Cart not found');
    }
  
    // Verificar stock
    const products = await Promise.all(cart.products.map(async (p) => {
      const product = await ProductDAO.getProductById(p.productId);
      return {
        product,
        quantity: p.quantity
      };
    }));
  
    const productsWithoutStock = products.filter(p => p.product.stock < p.quantity);
  
    if (productsWithoutStock.length > 0) {
      throw new Error(`Insufficient stock for products: ${productsWithoutStock.map(p => p.product.name).join(', ')}`);
    }
  
    // Deduct stock
    await Promise.all(products.map(async (p) => {
      p.product.stock -= p.quantity;
      await ProductDAO.updateProduct(p.product._id, { stock: p.product.stock });
    }));
  
    // Obtener el ID del usuario usando su correo electrónico
    const user = await UserDAO.getUserByEmail(userEmail);
    if (!user) {
      throw new Error('User not found');
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
