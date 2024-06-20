import Order from '../models/order.models.js';

class OrderDAO {
  async createOrder(data) {
    const order = new Order(data);
    return await order.save();
  }

  async getOrderById(id) {
    return await Order.findById(id).populate('user').populate('products.product');
  }

  async getOrders(query = {}, options = {}) {
    return await Order.paginate(query, options);
  }

  async updateOrder(id, data) {
    return await Order.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteOrder(id) {
    return await Order.findByIdAndDelete(id);
  }
}

export default new OrderDAO();
