import CartDAO from '../daos/cart.dao.js';

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

  async addProductToCart(cartId, productId, quantity) {
    return await CartDAO.addProductToCart(cartId, productId, quantity);
  }

  async removeProductFromCart(cartId, productId) {
    return await CartDAO.removeProductFromCart(cartId, productId);
  }

  async clearCart(cartId) {
    return await CartDAO.updateCart(cartId, { products: [] });
  }

  async purchaseCart(cartId, userId) {
    const cart = await CartDAO.getCartById(cartId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    // Check for stock and handle ticket creation
    const productsWithoutStock = cart.products.filter(p => p.product.stock < p.quantity);
    if (productsWithoutStock.length > 0) {
      throw new Error(`Insufficient stock for products: ${productsWithoutStock.map(p => p.product.name).join(', ')}`);
    }

    // Deduct stock
    await Promise.all(cart.products.map(async (p) => {
      p.product.stock -= p.quantity;
      await p.product.save();
    }));

    // Create ticket
    const ticket = await TicketManager.createTicket(cart, userId);

    return ticket;
  }
}

export default new CartService();
