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

  async addProductsToCart(cartId, products) {
    const cart = await this.getCartById(cartId);
    console.log('DAO: Retrieved cart:', cart);
  
    for (const { product, quantity } of products) {
      if (!product || !quantity) {
        console.log('DAO error: Missing product or quantity');
        throw new Error('Missing product or quantity');
      }
  
      console.log('Processing product:', product, 'Quantity:', quantity);
      const productIndex = cart.products.findIndex(p => p.product.toString() === product.toString());
  
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product, quantity });
      }
    }
  
    console.log('Saving cart with updated products');
    return await cart.save();
  }
  

  async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    return await cart.save();
  }
}

export default new CartDAO();
