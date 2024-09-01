import CartDAO from '../daos/cart.dao.js';
import Product from '../models/product.models.js';
import Cart from '../models/cart.models.js';

class CartService {
  async createCart(data) {
    return await CartDAO.createCart(data);
  }

  async getCartById(id) {
    return await Cart.findById(id).populate('products.product');
  }

  async updateCart(cartId, data) {
    return await CartDAO.updateCart(cartId, data);
  }

  async deleteCart(id) {
    return await CartDAO.deleteCart(id);
  }

  async calculateCartTotal(cart) {
    return cart.products.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  async addProductToCart(cartId, productId, quantity) {
    const productExists = await Product.findById(productId);
    if (!productExists) {
      throw new Error('Producto no encontrado');
    }
    return await CartDAO.addProductToCart(cartId, { productId, quantity });
  }

  async removeProductFromCart(cartId, productId) {
    return await CartDAO.removeProductFromCart(cartId, productId);
  }

  async clearCart(cartId) {
    return await CartDAO.updateCart(cartId, { products: [] });
  }
 async getCartByUserId(userId) {
    return await CartDAO.getCartByUserId(userId);
  }
}

export default new CartService();
