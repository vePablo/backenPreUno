import CartService from '../services/cart.services.js';
import PurchaseService from '../services/purchase.services.js';

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
    const userId = req.params.userId;
    const cart = await CartService.getCartByUserId(userId);
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

export async function addProductToCart(req, res) {
  try {
    const cartId = req.params.id;
    const { productId, quantity } = req.body;

    console.log(`Cuerpo de la solicitud: ${JSON.stringify(req.body)}`);
    console.log(`ID del Producto Recibido: ${productId}`);

    const updatedCart = await CartService.addProductToCart(cartId, productId, quantity);

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({
      error: "Error al agregar producto al carrito",
      details: error.message,
    });
  }
}

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
