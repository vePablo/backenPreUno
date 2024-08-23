import CartModel from '../models/cart.models.js';
import ProductModel from '../models/product.models.js';
import TicketManager from './ticket.manager.js';

class CartManager {
  static async getCartById(id) {
    try {
      const cart = await CartModel.findById(id).populate('products.product');
      if (!cart) {
        throw new Error('Cart not found');
      }
      return cart;
    } catch (error) {
      throw new Error('Error getting cart by ID: ' + error.message);
    }
  }

  static async updateCart(id, updateData) {
    try {
      const cart = await CartModel.findByIdAndUpdate(id, updateData, { new: true });
      if (!cart) {
        throw new Error('Cart not found');
      }
      return cart;
    } catch (error) {
      throw new Error('Error updating cart: ' + error.message);
    }
  }

  static async isStockSufficient(productId, quantity) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }
      return product.stock >= quantity;
    } catch (error) {
      throw new Error('Error checking stock: ' + error.message);
    }
  }

  static async purchase(cartId, userEmail) {
    try {
      const cart = await CartManager.getCartById(cartId);
      const productsWithoutStock = [];
  
      for (const p of cart.products) {
        const isSufficient = await CartManager.isStockSufficient(p.product._id, p.quantity);
        if (!isSufficient) {
          productsWithoutStock.push(p.product.name);
        }
      }
  
      if (productsWithoutStock.length > 0) {
        throw new Error(`Los siguientes productos no tienen stock suficiente: ${productsWithoutStock.join(', ')}`);
      }
  
      await Promise.all(cart.products.map(async (p) => {
        const product = await ProductModel.findById(p.product._id);
        if (!product) {
          throw new Error('Product not found');
        }
        product.stock -= p.quantity;
        await product.save();
      }));
  
      const ticket = await TicketManager.createTicket(cart, userEmail);
  
      await CartManager.updateCart(cartId, { products: [] });
  
      return ticket;
    } catch (error) {
      throw new Error('Error processing purchase: ' + error.message);
    }
  }  
}

export default CartManager;