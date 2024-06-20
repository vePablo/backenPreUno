import OrderDAO from '../daos/order.dao.js';

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
}

export default new OrderService();
