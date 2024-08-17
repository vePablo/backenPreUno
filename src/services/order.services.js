import OrderDAO from '../daos/order.dao.js';
import ProductDAO from '../daos/product.dao.js';
class OrderService {
  async createOrder(data) {
    return await OrderDAO.createOrder(data);
  }

  async getOrderById(id) {
    return await OrderDAO.getOrderById(id);
  }

  async getOrders(query = {}, options = {}) {
    return await OrderDAO.getOrders(query, options);
  }

  async updateOrder(id, data) {
    return await OrderDAO.updateOrder(id, data);
  }

  async deleteOrder(id) {
    return await OrderDAO.deleteOrder(id);
  }

  async addProductToOrder(orderId, productId, quantity) {
    try {
      const order = await OrderDAO.getOrderById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      const product = await ProductDAO.getProductById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      const existingProductIndex = order.products.findIndex(p => p.productId.toString() === productId);
      if (existingProductIndex > -1) {
      
        order.products[existingProductIndex].quantity += quantity;
      } else {
       
        order.products.push({ productId, quantity });
      }

      
      return await OrderDAO.updateOrder(orderId, { products: order.products });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new OrderService();
