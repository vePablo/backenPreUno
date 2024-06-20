import CartDAO from '../daos/cart.dao.js';

class CartService {
  async createCart(data) {
    return await CartDAO.createCart(data);
  }

  async getCartById(id) {
    return await CartDAO.getCartById(id);
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
}

export default new CartService();
