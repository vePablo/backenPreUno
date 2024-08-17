import OrderService from '../services/order.services.js';

export const createOrder = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body);
    res.status(201).json({ status: 'success', payload: order });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    res.status(200).json({ status: 'success', payload: order });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {
      limit: parseInt(limit, 10),
      page: parseInt(page, 10),
      sort: sort ? { createdAt: sort === 'asc' ? 1 : -1 } : {},
    };
    const filters = query ? { status: query } : {};
    const result = await OrderService.getOrders(filters, options);
    res.status(200).json({ status: 'success', ...result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await OrderService.updateOrder(req.params.id, req.body);
    res.status(200).json({ status: 'success', payload: order });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await OrderService.deleteOrder(req.params.id);
    res.status(200).json({ status: 'success', message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
export const addProductToOrder = async (req, res) => {
  try {
    const { orderId, productId, quantity } = req.body;
    const updatedOrder = await OrderService.addProductToOrder(orderId, productId, quantity);
    res.status(200).json({ status: 'success', payload: updatedOrder });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
export const clearOrder = async (req, res) => {
  try {
    const order = await OrderService.clearOrder(req.params.id);
    res.status(200).json({ status: 'success', payload: order });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
export const removeProductFromOrder = async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const updatedOrder = await OrderService.removeProductFromOrder(orderId, productId);
    res.status(200).json({ status: 'success', payload: updatedOrder });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
export const purchaseOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await OrderService.purchaseOrder(orderId);
    res.status(200).json({ status: 'success', payload: updatedOrder });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};