import CartService from '../services/cart.services.js';

export const createCart = async (req, res) => {
  try {
    const cart = await CartService.createCart(req.body);
    res.status(201).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await CartService.getCartById(req.params.id);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const cart = await CartService.getCartByUserId(req.user._id);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const cart = await CartService.updateCart(req.params.id, req.body);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    await CartService.deleteCart(req.params.id);
    res.status(200).json({ status: 'success', message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await CartService.addProductToCart(req.params.id, productId, quantity);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await CartService.removeProductFromCart(req.params.id, productId);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await CartService.clearCart(req.params.id);
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const ticket = await CartService.purchase(id, userId);

    res.status(200).json({
      message: 'Compra finalizada',
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al finalizar la compra',
      details: error.message,
    });
  }
};