import Cart from '../models/cart.models.js';

class CartDAO {
  async createCart(data) {
    const cart = new Cart(data);
    return await cart.save();
  }

  async getCartById(id) {
    return await Cart.findById(id).populate('products.product');
  }

  async getCartByUserId(userId) {
    return await Cart.findOne({ userId }).populate('products.product');
  }

  async updateCart(id, data) {
    return await Cart.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCart(id) {
    return await Cart.findByIdAndDelete(id);
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    return await cart.save();
  }
}

export default new CartDAO();
