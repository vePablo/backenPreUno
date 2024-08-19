import CartService from '../services/cart.services.js';
import { generateTicket } from '../helpers/ticket.js';
import ProductService from '../services/product.services.js';
import OrderService from '../services/order.services.js'; 

export const purchaseCart = async (req, res) => {
  try {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const { cartId } = req.body;
    
    // Obtener el carrito del usuario
    const cart = await CartService.getCartById(cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    // Verificar stock de los productos en el carrito
    for (const item of cart.items) {
      const product = await ProductService.getProductById(item.productId);
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `No hay suficiente stock para el producto ${product.name}` });
      }
    }

    // Crear pedido
    const order = await OrderService.createOrder({
      userId: req.user._id,
      items: cart.items,
      total: cart.total,
    });

    // Actualizar stock
    for (const item of cart.items) {
      await ProductService.updateStock(item.productId, item.quantity);
    }

    // Limpiar carrito
    await CartService.clearCart(cartId);

    // Generar y devolver ticket
    const ticket = generateTicket(order);
    res.status(200).json({ message: 'Compra realizada con éxito', order, ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
